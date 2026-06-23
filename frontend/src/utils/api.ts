const AI_ENGINE_URL = process.env.NEXT_PUBLIC_AI_ENGINE_URL || 'http://localhost:3001';

export async function sendChatMessage(
  message: string,
  sessionId: string
): Promise<{ text: string; metadata?: Record<string, string> }> {
  const response = await fetch(`${AI_ENGINE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.statusText}`);
  }

  return response.json();
}

export async function submitVisitorForm(formData: {
  name: string;
  phone: string;
  course: string;
}) {
  const response = await fetch(`${AI_ENGINE_URL}/api/submit-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Form submission error: ${response.statusText}`);
  }

  return response.json();
}
