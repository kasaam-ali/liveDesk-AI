# LiveDesk AI — AI Engine

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com)
[![Gemini](https://img.shields.io/badge/Gemini-API-4285F4?logo=google)](https://ai.google.dev)
[![Groq](https://img.shields.io/badge/Groq-API-38B2AC)](https://console.groq.com)

The core AI engine that powers LiveDesk conversations. Built with Express, it provides chat and voice endpoints with automatic failover between AI providers.

---

## Table of Contents

- [Architecture](#architecture)
- [AI Providers](#ai-providers)
- [Endpoints](#endpoints)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)

---

## Architecture

```
Request → Express Server
              │
              ▼
      Conversation Handler
              │
       ┌──────┴──────┐
       ▼              ▼
   Gemini API    Groq API (fallback)
    (primary)     (llama-3.1-8b-instant)
       │              │
       └──────┬──────┘
              ▼
      Response + Session Update
```

## AI Providers

| Provider | Role | Model | When Used |
|----------|------|-------|-----------|
| **Gemini** | Primary | `gemini-pro` | Always tried first |
| **Groq** | Fallback | `llama-3.1-8b-instant` | Only if Gemini fails |

The engine automatically falls back to Groq if the Gemini API call fails (network error, quota exceeded, etc.).

---

## Endpoints

### `GET /health`

Health check.

**Response:**
```json
{ "status": "OK", "service": "LiveDesk AI Engine" }
```

### `POST /api/chat`

Process a text message through the AI providers.

**Request:**
```json
{
  "message": "What courses do you offer?",
  "sessionId": "session-1712345678"
}
```

**Response:**
```json
{
  "success": true,
  "text": "We offer Web Development, AI, Cloud Computing, and Graphic Design.",
  "metadata": {
    "sessionId": "session-1712345678",
    "timestamp": "2026-06-23T10:30:00.000Z"
  }
}
```

### `POST /api/voice`

Process audio data (speech-to-text → AI → text-to-speech).

**Request:**
```json
{
  "audioData": "<base64-audio>",
  "sessionId": "session-1712345678"
}
```

---

## Project Structure

```
ai-engine/
├── index.js                    # Express server — routes and middleware
├── test.js                     # Module tests
├── conversation/
│   ├── handler.js              # Gemini + Groq integration, session management
│   └── context.js              # Knowledge base (courses, FAQs, contact info)
├── prompts/
│   └── manager.js              # System prompt builder
└── voice/
    └── processor.js            # Speech-to-text and text-to-speech utilities
```

---

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env — add GEMINI_API_KEY (and optionally GROQ_API_KEY)
npm run dev
# Server starts on http://localhost:3001
```

### Test

```bash
npm test
```

### Production

```bash
npm start
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ | — | Google Gemini API key |
| `GROQ_API_KEY` | ❌ | — | Groq API key (fallback) |
| `GROQ_MODEL` | ❌ | `llama-3.1-8b-instant` | Groq model name |
| `PORT` | ❌ | 3001 | Server port |
