export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
    const company = body.company;
    const apiKey = process.env.GEMINI_API_KEY;

    const prompt = "You are a senior interviewer at " + company + ". Interview a final year B.E. student. Always respond in this exact format:\nSCORE: X/10\nFEEDBACK: feedback here\nNEXT QUESTION: question here\n\nStudent answer: " + message;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    console.log("RAW RESPONSE:", JSON.stringify(data));
    
    if (!data.candidates || !data.candidates[0]) {
      return Response.json({ reply: "API Error: " + JSON.stringify(data) });
    }
    
    const text = data.candidates[0].content.parts[0].text;
    return Response.json({ reply: text.replace(/\*\*/g, "") });

  } catch (err) {
    return Response.json({ reply: "Error: " + err.message });
  }
}
