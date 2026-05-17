export async function POST(request) {
  try {
    const { topic, difficulty } = await request.json();
    const apiKey = process.env.GROQ_API_KEY;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{
          role: 'user',
          content: `Generate exactly 5 multiple choice aptitude questions for topic: ${topic}, difficulty: ${difficulty}.
Return ONLY a raw JSON array with no markdown, no backticks, no explanation.
Each object must have exactly these fields:
{
  "question": "the question text",
  "options": ["option A text", "option B text", "option C text", "option D text"],
  "correct": 0,
  "explanation": "why this answer is correct"
}
correct is the index 0,1,2 or 3 of the correct option in the options array.
Make sure options array always has exactly 4 strings with actual text content.`
        }],
        max_tokens: 1000
      })
    });

    const raw = await res.json();
    const text = raw?.choices?.[0]?.message?.content;
    if (!text) return Response.json({ error: 'No response' }, { status: 500 });

    const clean = text.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(clean);
    return Response.json(questions);
  } catch (error) {
    console.error('APTITUDE API ERROR:', error?.message || error);
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
