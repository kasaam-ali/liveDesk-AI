import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const sessions = new Map();

function getSystemPrompt() {
  return `You are LiveDesk AI, a friendly and professional virtual receptionist for Saylani Mass IT Training in Karachi, Pakistan.

YOUR ROLE:
- First point of contact for visitors and students
- Warm, patient, and professional tone
- Answer in English or Roman Urdu based on user's language
- Keep responses concise (2-3 sentences)

AVAILABLE COURSES:
- Web & Mobile App Development: 6 months, PKR 5,000/month, Mon/Wed/Fri 9AM-12PM
- Artificial Intelligence: 6 months, PKR 6,000/month, Tue/Thu/Sat 2PM-5PM
- Cloud Computing: 4 months, PKR 5,000/month, Mon/Wed/Fri 2PM-5PM
- Graphic Designing: 3 months, PKR 4,000/month, Tue/Thu 10AM-1PM

WORKING HOURS: Mon-Fri 9AM-6PM, Sat 9AM-2PM, Sun Closed
CONTACT: +92-21-9924567
ADDRESS: Street 14, Block 7, KDA Scheme 5, Clifton, Karachi

Help the visitor with their query.`;
}

export async function POST(request) {
  try {
    const { message, sessionId = 'default' } = await request.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    let sessionHistory = sessions.get(sessionId) || [];
    const systemPrompt = getSystemPrompt();

    const conversationHistory = sessionHistory
      .slice(-10)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n');

    const fullPrompt = `${systemPrompt}\n\nPrevious conversation:\n${conversationHistory}\n\nUser: ${message}\nAssistant:`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiText = response.text();

    sessionHistory.push(
      { role: 'User', content: message },
      { role: 'Assistant', content: aiText }
    );

    if (sessionHistory.length > 20) {
      sessionHistory = sessionHistory.slice(-20);
    }
    sessions.set(sessionId, sessionHistory);

    return Response.json({
      text: aiText,
      metadata: { sessionId, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
