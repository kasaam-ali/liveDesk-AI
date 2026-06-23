const conversationLogs = [];

export function logConversation({ visitorPhone, messages, duration, outcome }) {
  const log = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    visitorPhone,
    messageCount: messages ? messages.length : 0,
    duration: duration || 0,
    outcome: outcome || 'info_given',
    messages: messages || [],
  };

  conversationLogs.push(log);
  return log;
}

export function getStats() {
  if (conversationLogs.length === 0) {
    return {
      totalConversations: 0,
      appointmentsBooked: 0,
      avgDuration: 0,
    };
  }

  return {
    totalConversations: conversationLogs.length,
    appointmentsBooked: conversationLogs.filter((l) => l.outcome === 'appointment_booked').length,
    avgDuration:
      conversationLogs.reduce((acc, l) => acc + l.duration, 0) / conversationLogs.length,
  };
}
