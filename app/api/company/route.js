export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
    const company = body.company;
    const apiKey = process.env.GROQ_API_KEY;

    const prompt = "You are a senior interviewer at " + company + ". Interview a final year B.E. student. Always respond in this exact format:\nSCORE: X/10\nFEEDBACK: feedback here\nNEXT QUESTION: question here\n\nStudent answer: " + message;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    console.log("RAW RESPONSE:", JSON.stringify(data));
    
    if (!data.choices || !data.choices[0]) {
      return Response.json({ reply: "API Error: " + JSON.stringify(data) }, { status: 502 });
    }
    
    const text = data.choices[0].message.content;
    return Response.json({ reply: text.replace(/\*\*/g, "") });

  } catch (err) {
    return Response.json({ reply: "Error: " + err.message }, { status: 500 });
  }
}
