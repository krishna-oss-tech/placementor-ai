export async function POST(request) {
  try {
    const { message, company } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const prompt = `You are a senior interviewer at ${company}. Interview a final year B.E. student for software engineer role.

ALWAYS respond in EXACTLY this format:
SCORE: X/10
FEEDBACK: your feedback here in 2-3 lines
NEXT QUESTION: your next question here

Student answer: ${message}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
        })
      }
    );

    const raw = await res.json();
    console.log("COMPANY API RAW:", JSON.stringify(raw));
    const text = raw?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (!text) return Response.json({ reply: "Error: No response from AI" });
    return Response.json({ reply: text.replace(/\*\*/g, '') });

  } catch (error) {
    console.error("COMPANY ERROR:", error.message);
    return Response.json({ reply: "Error: " + error.message });
  }
}
