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
          contents: [{ parts: [{ text: `You are a senior interviewer at ${company}. Interview a final year B.E. student for software engineer role. ALWAYS respond in EXACTLY this format:\nSCORE: X/10\nFEEDBACK: your feedback here\nNEXT QUESTION: your next question here\n\nStudent answer: ${message}` }] }]
        })
      }
    );
    const raw = await res.json();
    const text = raw?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (!text) return Response.json({ reply: "Error getting response" });
    return Response.json({ reply: text.replace(/\*\*/g, '') });
  } catch (error) {
    return Response.json({ reply: "Error: " + error.message });
  }
}
