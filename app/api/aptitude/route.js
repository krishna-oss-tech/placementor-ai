export async function POST(request) {
  try {
    const { topic, difficulty } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate exactly 5 aptitude questions for topic: ${topic}, difficulty: ${difficulty}. \nReturn ONLY a valid JSON array with no markdown, no backticks, just raw JSON:\n[{\n  question: string,\n  options: [string, string, string, string],\n  correct: 0,\n  explanation: string\n}]\ncorrect is the index (0,1,2,3) of the correct option.`
            }]
          }],
          generationConfig: { temperature: 0.2 }
        })
      }
    );

    const raw = await res.json();
    const text = raw?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (!text) return Response.json({ error: 'No response' }, { status: 500 });

    const clean = text.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(clean);
    return Response.json(questions);
  } catch (error) {
    console.error('APTITUDE API ERROR:', error?.message || error);
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
