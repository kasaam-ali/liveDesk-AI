export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return Response.json({ text: getDefaultResponse(), metadata: { source: 'no-key' } });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are LiveDesk AI, a friendly receptionist at Saylani Mass IT Training in Karachi, Pakistan. Answer in English or Roman Urdu. Be warm, concise. Keep responses under 3 sentences. Available courses: Web Development (PKR 5,000/month, 6 months), Python (PKR 4,000/month, 4 months), Graphic Design (PKR 4,000/month, 3 months), AI/ML (PKR 6,000/month, 8 months), Data Science (PKR 5,000/month, 6 months). Classes: Mon-Fri 9AM-6PM, Weekend Sat 10AM-2PM. Contact: +92-21-9924567.`,
          },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error(`Groq API error: ${response.status}`);

    const data = await response.json();
    return Response.json({ text: data.choices[0].message.content, metadata: { source: 'groq' } });

  } catch {
    return Response.json({ text: getDefaultResponse(), metadata: { source: 'fallback' } });
  }
}

function getDefaultResponse(): string {
  return 'I did not quite understand that. Could you please rephrase? Or I can connect you to a human agent if you prefer.';
}
