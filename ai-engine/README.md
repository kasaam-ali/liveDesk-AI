# LiveDesk AI — AI Engine

The core AI engine that powers LiveDesk. Built with Express and Google Gemini API, it handles conversation processing, speech-to-text, text-to-speech, and session management.

## Capabilities

- **Conversation Processing**: Integrates with Google Gemini for intelligent, context-aware responses
- **Speech-to-Text**: Processes audio input using Gemini's multimodal capabilities
- **Text-to-Speech**: Returns text for browser-based speech synthesis
- **Session Management**: Maintains conversation history per visitor session
- **Context Awareness**: Uses a knowledge base of Saylani Mass IT courses, FAQs, and contact information

## Quick Start

### Prerequisites

- Node.js 18+
- Google Gemini API key ([get one free](https://aistudio.google.com/app/apikey))

### Installation

```bash
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

The server starts on `http://localhost:3001`.

## API Endpoints

| Endpoint       | Method | Description                              |
|----------------|--------|------------------------------------------|
| `/health`      | GET    | Health check                             |
| `/api/chat`    | POST   | Send a text message, receive AI response |
| `/api/voice`   | POST   | Send audio data, receive audio response  |

## Project Structure

```
ai-engine/
├── index.js                # Express server — routes and middleware
├── conversation/
│   ├── handler.js          # Gemini API integration and session management
│   └── context.js          # Knowledge base (courses, FAQs, contact info)
├── prompts/
│   └── manager.js          # System prompt builder for Gemini
└── voice/
    └── processor.js        # Speech-to-text and text-to-speech utilities
```

## Environment Variables

| Variable        | Required | Description            |
|-----------------|----------|------------------------|
| `GEMINI_API_KEY` | Yes      | Google Gemini API key |
| `PORT`          | No       | Server port (default: 3001) |

## API Usage

### Chat

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What courses do you offer?", "sessionId": "test-123"}'
```

### Health Check

```bash
curl http://localhost:3001/health
```
