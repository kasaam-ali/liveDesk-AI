const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptManager = require('../prompts/manager');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

class ConversationHandler {
  constructor() {
    this.sessions = new Map();
  }

  async processMessage(message, sessionId = 'default') {
    let sessionHistory = this.sessions.get(sessionId);
    if (!sessionHistory) {
      sessionHistory = [];
      this.sessions.set(sessionId, sessionHistory);
    }

    const systemPrompt = promptManager.getSystemPrompt();
    const conversationHistory = sessionHistory
      .slice(-10)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const fullPrompt = `${systemPrompt}\n\nPrevious conversation:\n${conversationHistory}\n\nUser: ${message}\nAssistant:`;

    let aiText;

    try {
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      aiText = response.text();
    } catch (geminiError) {
      console.error('Gemini API error, trying Groq:', geminiError.message);

      if (GROQ_API_KEY) {
        try {
          const groqResponse = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: GROQ_MODEL,
              messages: [
                { role: 'system', content: systemPrompt },
                ...sessionHistory.map(msg => ({ role: msg.role.toLowerCase(), content: msg.content })),
                { role: 'user', content: message },
              ],
              temperature: 0.7,
              max_tokens: 200,
            }),
          });

          if (groqResponse.ok) {
            const data = await groqResponse.json();
            aiText = data.choices[0].message.content;
          } else {
            throw new Error(`Groq API error: ${groqResponse.status}`);
          }
        } catch (groqError) {
          console.error('Groq API error:', groqError.message);
          throw new Error('All AI providers failed');
        }
      } else {
        throw new Error('Gemini failed and no Groq key configured');
      }
    }

    sessionHistory.push(
      { role: 'User', content: message },
      { role: 'Assistant', content: aiText }
    );

    if (sessionHistory.length > 20) {
      sessionHistory = sessionHistory.slice(-20);
      this.sessions.set(sessionId, sessionHistory);
    }

    return {
      text: aiText,
      metadata: {
        sessionId,
        timestamp: new Date().toISOString(),
        messageLength: message.length,
        responseLength: aiText.length,
      },
    };
  }

  clearSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  getSessionStats(sessionId) {
    const session = this.sessions.get(sessionId);
    return {
      sessionId,
      messageCount: session ? session.length : 0,
      active: !!session,
    };
  }
}

module.exports = new ConversationHandler();
