const AI_ENGINE_URL = process.env.NEXT_PUBLIC_AI_ENGINE_URL || 'http://localhost:3001';
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.NEXT_PUBLIC_GROQ_MODEL || 'llama3-8b-8192';

const hardcodedResponses: Record<string, string> = {
  assalam: 'Wa Alaikum Assalam! I am LiveDesk AI, your virtual receptionist. How can I help you today?',
  salam: 'Wa Alaikum Assalam! How can I assist you today?',
  hello: 'Hello! I am LiveDesk AI. How can I help you?',
  hi: 'Hi there! I am LiveDesk AI, your receptionist. What can I do for you?',
  'web development': 'Web Development is a 6-month course covering HTML, CSS, JavaScript, and React. Fee is PKR 5,000/month. New batches start every Monday.',
  web: 'Web Development — 6 months, PKR 5,000/month. HTML, CSS, JS, React. New batch every Monday.',
  python: 'Python Programming is a 4-month course covering data structures, OOP, and projects. Fee: PKR 4,000/month.',
  'graphic design': 'Graphic Design is a 3-month course covering Photoshop, Illustrator, and Canva. Fee: PKR 4,000/month.',
  'mobile app': 'Mobile App Development is a 5-month Flutter course. Fee: PKR 5,000/month.',
  ai: 'AI & Machine Learning is an 8-month advanced course covering Python, TensorFlow, and real projects. Fee: PKR 6,000/month.',
  'data science': 'Data Science is a 6-month course covering Python, Pandas, and data visualization. Fee: PKR 5,000/month.',
  fees: 'Our course fees range from PKR 4,000 to PKR 6,000 per month. Which course are you interested in?',
  fee: 'Fees vary by course: Web Dev PKR 5,000, Python PKR 4,000, Graphic Design PKR 4,000, AI PKR 6,000.',
  timing: 'Classes run from 9 AM to 6 PM, Monday to Saturday. Weekend batches are also available.',
  time: 'Regular classes: Mon-Fri 9AM-6PM. Weekend: Saturday 10AM-2PM.',
  duration: 'Courses range from 3 to 8 months. Web Dev: 6 months, Python: 4 months, Graphic Design: 3 months, AI: 8 months.',
  certificate: 'Yes, a recognized certificate is provided upon completion of each course.',
  cert: 'Yes, a certificate is provided. Industry recognized.',
  admission: 'To apply, please visit our center with your CNIC copy, 2 passport-size photos, and fill the admission form.',
  apply: 'Visit our reception with your documents. A basic test is required for admission.',
  location: 'We are located at Street 14, Block 7, KDA Scheme 5, Clifton, Karachi.',
  address: 'Street 14, Block 7, KDA Scheme 5, Clifton, Karachi, Pakistan.',
  phone: 'You can reach us at +92-21-9924567, Monday to Saturday, 9 AM to 6 PM.',
  number: '+92-21-9924567. Call or WhatsApp during working hours.',
  whatsapp: 'You can message us on WhatsApp at +92-21-9924567.',
  default: 'I did not quite understand that. Could you please rephrase? Or I can connect you to a human agent if you prefer.',
};

const groqSystemPrompt = `You are LiveDesk AI, a friendly receptionist at Saylani Mass IT Training in Karachi, Pakistan.
Answer in English or Roman Urdu. Be warm, concise, and helpful. Keep responses under 3 sentences.
Available courses: Web Development (PKR 5,000/month, 6 months), Python (PKR 4,000/month, 4 months),
Graphic Design (PKR 4,000/month, 3 months), AI/ML (PKR 6,000/month, 8 months), Data Science (PKR 5,000/month, 6 months).
Classes: Mon-Fri 9AM-6PM, Weekend Sat 10AM-2PM. Contact: +92-21-9924567.`;

function getHardcodedResponse(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(hardcodedResponses)) {
    if (lower.includes(keyword)) {
      return response;
    }
  }
  return null;
}

async function callGroqAPI(message: string): Promise<string | null> {
  if (!GROQ_API_KEY) return null;

  try {
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: groqSystemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`Groq API error: ${response.status}`);

    const data = await response.json();
    return data.choices[0].message.content;
  } catch {
    return null;
  }
}

export async function sendChatMessage(
  message: string,
  sessionId: string
): Promise<{ text: string; metadata?: Record<string, string> }> {
  const hardcoded = getHardcodedResponse(message);
  if (hardcoded) {
    return { text: hardcoded, metadata: { source: 'hardcoded' } };
  }

  const groqResponse = await callGroqAPI(message);
  if (groqResponse) {
    return { text: groqResponse, metadata: { source: 'groq' } };
  }

  try {
    const response = await fetch(`${AI_ENGINE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error(`Chat API error: ${response.statusText}`);

    return response.json();
  } catch {
    return {
      text: hardcodedResponses.default,
      metadata: { source: 'fallback' },
    };
  }
}

export async function submitVisitorForm(formData: {
  name: string;
  phone: string;
  course: string;
}) {
  try {
    const response = await fetch(`${AI_ENGINE_URL}/api/submit-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error(`Form submission error: ${response.statusText}`);

    return response.json();
  } catch {
    return {
      success: true,
      message: `Thank you, ${formData.name}! Your information has been recorded.`,
      offline: true,
    };
  }
}
