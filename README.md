# LiveDesk AI — Visual AI Receptionist

An AI-powered virtual receptionist for schools, clinics, and training centers. LiveDesk AI conducts voice conversations in English and Urdu, fills visitor forms, books appointments, and sends WhatsApp confirmations — all through an animated interface.

## Architecture

```
User ──► Frontend (Next.js) ──► AI Engine (Express + Gemini) ──► Integrations
          │                                                          │
          │  Web Speech API                                         ├── WhatsApp (Twilio)
          │  Real Avatar Images                                     ├── Appointment Booking
          │  Chat Interface                                         └── Analytics Logging
          │
          └── Backend API Routes (Chat, Form Submission)
```

## Tech Stack

| Layer         | Technology                               |
|---------------|------------------------------------------|
| Frontend      | Next.js 16, TypeScript, Tailwind CSS v4  |
| AI Engine     | Node.js, Express, Google Gemini API      |
| Voice         | Web Speech API (browser-native)          |
| Messaging     | Twilio WhatsApp API                      |
| Avatar        | Real portrait images with CSS animations |

## Project Structure

```
livedesk-ai/
├── frontend/          # Next.js web application
│   ├── src/
│   │   ├── app/       # Pages and layout
│   │   ├── components/# UI components (Avatar, Chat, Forms)
│   │   ├── hooks/     # Custom React hooks
│   │   └── utils/     # API client utilities
│   └── public/        # Static assets (avatar images)
├── ai-engine/         # Express server with Gemini AI
│   ├── conversation/  # Conversation state management
│   ├── prompts/       # System prompt templates
│   └── voice/         # Speech processing utilities
├── backend/           # API route definitions
│   ├── api/           # Chat and form endpoints
│   ├── middleware/    # Rate limiting, auth
│   └── models/       # Data schemas
├── integrations/      # Third-party service connectors
│   ├── whatsapp/      # Twilio WhatsApp integration
│   ├── appointments/  # Appointment booking logic
│   └── analytics/     # Conversation logging
└── docs/             # Documentation
```

## Quick Start

### 1. Set Up the AI Engine

```bash
cd ai-engine
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm install
npm run dev
# AI engine starts on http://localhost:3001
```

### 2. Set Up the Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
# Open http://localhost:3000 in Chrome or Edge
```

### 3. Speak with the AI

Click the microphone button and ask questions like:
- "What courses do you offer?"
- "How much is the fee?"
- "I want to enroll in Web Development"
- "Admission kaise lein?"

## Environment Variables

Copy `.env.example` to `.env.local` (frontend) or `.env` (ai-engine) and fill in your keys:

| Variable                    | Required | Description                     |
|-----------------------------|----------|---------------------------------|
| `GEMINI_API_KEY`            | Yes      | Google Gemini AI API key        |
| `TWILIO_ACCOUNT_SID`        | No       | Twilio account SID              |
| `TWILIO_AUTH_TOKEN`         | No       | Twilio auth token               |
| `TWILIO_WHATSAPP_NUMBER`    | No       | Twilio WhatsApp number          |
| `NEXT_PUBLIC_AI_ENGINE_URL` | For prod | URL of the deployed AI engine   |
| `NEXT_PUBLIC_APP_URL`       | For prod | Public URL of the frontend      |

## Features

- **Real Avatar**: Professional portrait images that transition through idle, speaking, listening, and thinking states with smooth animations.
- **Voice Conversation**: Browser-native speech recognition and synthesis for hands-free interaction.
- **Bilingual Support**: Fluent in both English and Urdu (Roman Urdu).
- **Visitor Form**: Automatically captures visitor information during conversation.
- **WhatsApp Confirmation**: Sends appointment confirmations via Twilio WhatsApp.
- **Human Handoff**: Seamless transfer to a human agent when needed.
- **Dark Mode**: Full dark mode support with system preference detection.

## Browser Support

For the best experience, use **Google Chrome** or **Microsoft Edge**. These browsers have full Web Speech API support.
