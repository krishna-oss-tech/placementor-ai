export async function POST(request) {
  try {
    const { resume } = await request.json();
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
          content: `Analyze this resume. Return ONLY a raw JSON object with no markdown, no backticks, no extra text. Just pure JSON with these exact fields: overall_score (number 0-100), ats_score (number 0-100), top_3_fixes (array of 3 strings), missing_keywords (array of strings), improved_summary (string). Resume: ${resume}`
        }],
        max_tokens: 1000
      })
    });

    const raw = await res.json();
    console.log("RAW:", JSON.stringify(raw));

    const text = raw?.choices?.[0]?.message?.content;
    if (!text) return Response.json({ error: "No text in response" }, { status: 500 });

    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return Response.json(parsed);

  } catch (error) {
    console.error("ERROR:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
