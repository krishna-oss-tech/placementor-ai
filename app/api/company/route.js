export async function POST(request) {
  try {
    const { message, company } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return Response.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const prompt = `You are a senior interviewer at ${company}. You are interviewing a final year B.E. student for a software engineer role. Ask company-specific questions that ${company} is known for asking. After each answer give score out of 10, specific feedback, and next question. Be direct and professional. Student answer: ${message}`;

    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: { text: prompt }
      })
    });

    const data = await res.json();

    // Robust extraction of reply text from possible Gemini response shapes
    let reply = '';
    if (data?.candidates && Array.isArray(data.candidates) && data.candidates[0]) {
      const cand = data.candidates[0];
      if (typeof cand.output === 'string') reply = cand.output;
      else if (typeof cand.content === 'string') reply = cand.content;
      else if (Array.isArray(cand.content)) {
        reply = cand.content.map(c => c.text || c.output_text || JSON.stringify(c)).join(' ');
      } else {
        reply = JSON.stringify(cand);
      }
    } else if (data?.output && Array.isArray(data.output)) {
      // some responses put content under output
      try {
        reply = data.output.map(o => {
          if (typeof o === 'string') return o;
          if (o?.content && Array.isArray(o.content)) return o.content.map(c => c.text || c.output_text || JSON.stringify(c)).join(' ');
          return JSON.stringify(o);
        }).join('\n');
      } catch (e) {
        reply = JSON.stringify(data.output);
      }
    } else if (data?.outputText) {
      reply = data.outputText;
    } else {
      reply = JSON.stringify(data);
    }

    return Response.json({ reply });
  } catch (error) {
    console.error('COMPANY API ERROR:', error?.message || error);
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
