# LiveDesk AI — Visual AI Receptionist

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered virtual receptionist for schools, clinics, and training centers. LiveDesk AI conducts voice conversations in English and Urdu, fills visitor forms, books appointments, and sends WhatsApp confirmations — all through a lifelike video avatar interface.

---

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Browser Support](#browser-support)

---

## Architecture

```
Visitor ──► Frontend (Next.js 16)
                │
                ├── Avatar Video (looped, with state overlays)
                ├── Web Speech API (speech-to-text / text-to-speech)
                ├── Chat Interface (message bubbles)
                └── Visitor Form (voice-enabled)
                     │
                     ▼
         ┌──────────────────────┐
         │   Response Pipeline   │
         │   (3-tier fallback)   │
         └──────────────────────┘
                │
        ┌───────┼───────────┐
        ▼       ▼           ▼
   Hardcoded   Groq API   AI Engine
   Keywords    (Groq)     (Gemini+Groq)
   (instant)   (fast)     (server-side)
```

## Features

| Feature | Description |
|---------|-------------|
| **Video Avatar** | Looped video of a professional receptionist with state-based visual overlays (speaking, listening, thinking) |
| **Voice Conversation** | Browser-native speech recognition and synthesis for hands-free interaction |
| **Bilingual Support** | Fluent in both English and Urdu (Roman Urdu) |
| **Smart Fallback** | 3-tier response pipeline — hardcoded keywords, Groq API, then AI engine |
| **Visitor Form** | Captures visitor information during conversation |
| **Human Handoff** | Seamless transfer to a human agent when needed |
| **WhatsApp Integration** | Sends appointment confirmations via Twilio |
| **Dark Mode** | Full dark mode support with system preference detection |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| AI Providers | Google Gemini, Groq (llama-3.1-8b-instant) |
| Voice | Web Speech API (browser-native) |
| Messaging | Twilio WhatsApp API |
| Avatar | Looped video with CSS state overlays |

## Project Structure

```
livedesk-ai/
├── frontend/          # Next.js web application
│   ├── src/
│   │   ├── app/           # Pages and layout
│   │   ├── components/    # Avatar, Chat, Forms, Layout
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # API client utilities
│   └── public/            # Static assets (avatar video)
├── ai-engine/         # Express server with AI providers
│   ├── conversation/  # Session management
│   ├── prompts/       # System prompt templates
│   └── voice/         # Speech processing utilities
├── backend/           # API route definitions
│   ├── api/           # Chat and form endpoints
│   ├── middleware/    # Rate limiting
│   └── models/        # Data schemas
├── integrations/      # Third-party service connectors
│   ├── whatsapp/      # Twilio WhatsApp
│   ├── appointments/  # Appointment booking
│   └── analytics/     # Conversation logging
└── docs/             # Documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- A modern browser (Chrome or Edge recommended)
- Google Gemini API key ([free](https://aistudio.google.com/app/apikey))
- Groq API key ([free](https://console.groq.com)) — optional but recommended

### 1. Start the AI Engine

```bash
cd ai-engine
cp .env.example .env
# Edit .env — add your GEMINI_API_KEY and GROQ_API_KEY
npm install
npm run dev
# Runs on http://localhost:3001
```

### 2. Start the Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
# Open http://localhost:3000 in Chrome or Edge
```

### 3. Interact

Click the microphone button and speak naturally:
- "What courses do you offer?"
- "Admission kaise lein?"
- "Fee kitni hai?"

## Environment Variables

Copy `.env.example` to `.env.local` (frontend) or `.env` (ai-engine).

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `NEXT_PUBLIC_GROQ_API_KEY` | No | Groq API key (fast fallback) |
| `GROQ_API_KEY` | No | Groq key for ai-engine fallback |
| `TWILIO_ACCOUNT_SID` | No | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | No | Twilio auth token |
| `TWILIO_WHATSAPP_NUMBER` | No | Twilio WhatsApp number |
| `NEXT_PUBLIC_AI_ENGINE_URL` | For production | URL of deployed AI engine |
| `NEXT_PUBLIC_APP_URL` | For production | Public URL of the frontend |

## Deployment

### Static Export (Netlify Drop / Vercel)

```bash
cd frontend
npm run build
# Output in frontend/out/ — drag to Netlify Drop
```

The static export works with hardcoded and Groq fallback responses. For full AI features, deploy the ai-engine separately.

### Full Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## Browser Support

| Browser | Speech Recognition | Speech Synthesis |
|---------|-------------------|------------------|
| Chrome  | ✅ Full | ✅ Full |
| Edge | ✅ Full | ✅ Full |
| Safari | ⚠️ Limited | ✅ Full |
| Firefox | ❌ Not supported | ✅ Full |

For the best experience, use **Google Chrome** or **Microsoft Edge**.

---

## License

MIT — built for personal and educational use. Fork freely.
