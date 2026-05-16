export async function POST(request) {
  try {
    const { message, company } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a senior interviewer at ${company}. You are interviewing a final year B.E. student for a software engineer role. Ask company-specific questions that ${company} is known for asking. After each answer give score out of 10, specific feedback, and next question. Be direct and professional. Student answer: ${message}` }] }],
          generationConfig: { temperature: 0.2 }
        })
      }
    );

    const raw = await res.json();
    console.log("RAW:", JSON.stringify(raw));

    const text = raw?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (!text) return Response.json({ error: "No text in response" }, { status: 500 });

    const reply = text.trim();
    return Response.json({ reply });
  } catch (error) {
    console.error('COMPANY API ERROR:', error?.message || error);
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
