export async function sendChatMessage(
  message: string
): Promise<{ text: string; metadata?: Record<string, string> }> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    return response.json();
  } catch {
    return {
      text: 'I did not quite understand that. Could you please rephrase? Or I can connect you to a human agent if you prefer.',
      metadata: { source: 'fallback' },
    };
  }
}

export async function submitVisitorForm(formData: {
  name: string;
  phone: string;
  course: string;
}) {
  return {
    success: true,
    message: `Thank you, ${formData.name}! Your information has been recorded.`,
    offline: true,
  };
}
