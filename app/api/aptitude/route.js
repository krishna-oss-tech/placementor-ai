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
        max_tokens: 2000,
        temperature: 0.3
      })
    });

    const raw = await res.json();
    const text = raw?.choices?.[0]?.message?.content;
    if (!text) return Response.json({ error: 'No response' }, { status: 500 });

    let clean = text.replace(/```json|```/g, '').trim();
    
    // Find first [ and last ] to extract array
    const firstBracket = clean.indexOf('[');
    const lastBracket = clean.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1) {
      clean = clean.substring(firstBracket, lastBracket + 1);
    }
    
    // Fix common trailing comma issues in LLM JSON
    clean = clean.replace(/,\s*]/g, ']');
    clean = clean.replace(/,\s*}/g, '}');

    let questions;
    try {
      questions = JSON.parse(clean);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, '\\nRaw string:', clean);
      return Response.json({ error: 'AI generated invalid data. Please try again.' }, { status: 500 });
    }

    return Response.json(questions);
  } catch (error) {
    console.error('APTITUDE API ERROR:', error?.message || error);
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
