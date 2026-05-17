export async function POST(request) {
  try {
    const { resume } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Analyze this resume. Return ONLY a raw JSON object with no markdown, no backticks, no extra text. Just pure JSON with these exact fields: overall_score (number 0-100), ats_score (number 0-100), top_3_fixes (array of 3 strings), missing_keywords (array of strings), improved_summary (string). Resume: ${resume}` }] }],
          generationConfig: { temperature: 0.1 }
        })
      }
    );

    const raw = await res.json();
    console.log("RAW:", JSON.stringify(raw));

    const text = raw?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (!text) return Response.json({ error: "No text in response" }, { status: 500 });

    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return Response.json(parsed);

  } catch (error) {
    console.error("ERROR:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
