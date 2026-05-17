import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function POST(request) {
  try {
    const { message, interviewType } = await request.json();
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return Response.json({ reply: 'Error: Missing user ID' }, { status: 401 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const usageRef = doc(db, 'usage', userId);
    const usageSnap = await getDoc(usageRef);

    if (usageSnap.exists()) {
      const usage = usageSnap.data();
      const count = usage.count ?? 0;
      const date = usage.date || '';
      if (date === today) {
        if (count >= 3) {
          return Response.json({ reply: 'Daily limit reached. Upgrade to Pro!' }, { status: 429 });
        }
        await setDoc(usageRef, { count: increment(1) }, { merge: true });
      } else {
        await setDoc(usageRef, { count: 1, date: today });
      }
    } else {
      await setDoc(usageRef, { count: 1, date: today });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert placement interviewer at a top Indian IT company conducting a ${interviewType}.
              
The candidate is a final-year B.E. student from a tier-2 college.
After each answer: give score out of 10, 2-3 lines feedback, then ask next question.
Keep it concise and clear.

Student's answer: ${message}`
            }]
          }]
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('Gemini API error', data);
      const errMsg = data.error?.message || data?.status || 'Gemini request failed';
      return Response.json({ reply: `Error: ${errMsg}` }, { status: 502 });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      console.error('Gemini response missing reply', data);
      return Response.json({ reply: 'Error: no response from AI service' }, { status: 502 });
    }

    return Response.json({ reply });

  } catch (error) {
    console.error("ERROR:", error.message);
    return Response.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}