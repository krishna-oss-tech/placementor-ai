export async function POST(request) {
  try {
    const { message, interviewType } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ reply: 'Error: Missing Groq API key' }, { status: 500 });
    }

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
          content: `You are an expert placement interviewer at a top Indian IT company conducting a ${interviewType}.

The candidate is a final-year B.E. student from a tier-2 college.
After each answer: give score out of 10, 2-3 lines feedback, then ask next question.
Keep it concise and clear.

Student's answer: ${message}`
        }],
        max_tokens: 500
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Groq API error', data);
      const errMsg = data.error?.message || data?.status || 'Groq request failed';
      return Response.json({ reply: `Error: ${errMsg}` }, { status: 502 });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      console.error('Groq response missing reply', data);
      return Response.json({ reply: 'Error: no response from AI service' }, { status: 502 });
    }

    return Response.json({ reply });

  } catch (error) {
    console.error("ERROR:", error.message);
    return Response.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}