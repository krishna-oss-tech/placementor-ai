export async function POST(request) {
  try {
    const { resume } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });
    }

    const prompt = `You are a senior HR at a Fortune 500 IT company reviewing resumes for campus placement.

Analyze this student resume and return ONLY a valid JSON object — no markdown, no backticks, no explanation — just raw JSON like this:
{
  "overall_score": 72,
  "ats_score": 65,
  "top_3_fixes": ["fix 1", "fix 2", "fix 3"],
  "missing_keywords": ["keyword1", "keyword2", "keyword3"],
  "improved_summary": "A better professional summary written by you"
}

Resume to analyze:
${resume}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API error: ${errorText || res.statusText}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text || '';
    const clean = (text ?? '').replace(/```json|```/g, '').trim();
    console.log('AI RESPONSE:', clean);
    try {
      const parsed = JSON.parse(clean);
      return Response.json(parsed);
    } catch (e) {
      return Response.json(
        {
          overall_score: 60,
          ats_score: 55,
          top_3_fixes: [clean || 'Unable to parse AI response'],
          missing_keywords: [],
          improved_summary: 'Could not parse response'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("RESUME ERROR:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}