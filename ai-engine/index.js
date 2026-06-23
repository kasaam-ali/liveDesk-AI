require('dotenv').config();
const express = require('express');
const conversationHandler = require('./conversation/handler');
const voiceProcessor = require('./voice/processor');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'LiveDesk AI Engine' });
});

// Main Chat Endpoint - Receives audio/text, returns AI response
app.post('/api/chat', async (req, res) => {
  try {
    const { message, audioData, sessionId } = req.body;
    
    // If audio data is provided, convert to text first
    let userMessage = message;
    if (audioData) {
      userMessage = await voiceProcessor.speechToText(audioData);
    }

    if (!userMessage) {
      return res.status(400).json({ error: 'No message or audio provided' });
    }

    // Process conversation with Gemini
    const aiResponse = await conversationHandler.processMessage(userMessage, sessionId);

    // Convert response to speech
    const audioResponse = await voiceProcessor.textToSpeech(aiResponse.text);

    res.json({
      success: true,
      text: aiResponse.text,
      audio: audioResponse,
      metadata: aiResponse.metadata
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'AI processing failed',
      message: error.message 
    });
  }
});

// Voice-only endpoint (for direct audio processing)
app.post('/api/voice', async (req, res) => {
  try {
    const { audioData, sessionId } = req.body;
    
    // Speech to Text
    const userMessage = await voiceProcessor.speechToText(audioData);
    
    // Process with AI
    const aiResponse = await conversationHandler.processMessage(userMessage, sessionId);
    
    // Text to Speech
    const audioResponse = await voiceProcessor.textToSpeech(aiResponse.text);

    res.json({
      success: true,
      originalText: userMessage,
      responseText: aiResponse.text,
      audio: audioResponse
    });

  } catch (error) {
    console.error('Voice error:', error);
    res.status(500).json({ error: 'Voice processing failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 LiveDesk AI Engine running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`💬 Chat: http://localhost:${PORT}/api/chat`);
});

module.exports = app;