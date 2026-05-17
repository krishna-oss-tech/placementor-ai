export async function POST(request) {
  try {
    const { topic, difficulty } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate exactly 5 multiple choice aptitude questions for topic: ${topic}, difficulty: ${difficulty}.\nReturn ONLY a raw JSON array with no markdown, no backticks, no explanation.\nEach object must have exactly these fields:\n{\n  "question": "the question text",\n  "options": ["option A text", "option B text", "option C text", "option D text"],\n  "correct": 0,\n  "explanation": "why this answer is correct"\n}\ncorrect is the index 0,1,2 or 3 of the correct option in the options array.\nMake sure options array always has exactly 4 strings with actual text content.`
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
