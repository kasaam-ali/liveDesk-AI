# Conversation Handler

Manages chat sessions and conversation flow with Gemini AI.

## Features:

- Session management (keeps conversation history)
- Context-aware responses
- Multi-language support (Urdu/English)
- Automatic session cleanup

## Usage:

```javascript
const conversationHandler = require('./conversation/handler');

// Process a message
const response = await conversationHandler.processMessage(
  "Fee kya hai?",
  "user-session-123"
);

console.log(response.text);