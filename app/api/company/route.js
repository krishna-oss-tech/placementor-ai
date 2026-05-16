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
          contents: [{ parts: [{ text: `You are a senior interviewer at ${company}. Interview a final year B.E. student for software engineer role.\n\nIMPORTANT: Always respond in EXACTLY this format:\nSCORE: X/10\nFEEDBACK: your feedback here in 2-3 lines\nNEXT QUESTION: your next question here\n\nStudent answer: ${message}` }] }],
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
