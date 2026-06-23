# LiveDesk AI — Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

The LiveDesk AI frontend is a **Next.js 16** application that provides the user interface for the AI receptionist. It features a lifelike video avatar, voice interaction via the Web Speech API, and a responsive dark-mode-ready UI.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [Response Pipeline](#response-pipeline)
- [Environment Variables](#environment-variables)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome or Edge.

To create a static export for deployment:

```bash
npm run build
# Output: frontend/out/
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main page — LiveDesk AI interface
│   └── globals.css             # Tailwind CSS with custom scrollbar
├── components/
│   ├── Avatar/
│   │   └── AvatarVideo.tsx     # Looped video avatar with state overlays
│   ├── Chat/
│   │   ├── ChatBubble.tsx      # Individual message bubble
│   │   └── ChatBox.tsx         # Scrollable chat container
│   ├── Forms/
│   │   └── VisitorForm.tsx     # Voice-enabled visitor information form
│   ├── Layout/
│   │   └── Header.tsx          # Application header
│   ├── HandoffButton.tsx       # Human agent handoff
│   └── MicButton.tsx           # Microphone with speech support check
├── hooks/
│   └── useSpeechRecognition.ts # Web Speech API hook
├── types/
│   └── index.ts                # TypeScript type definitions
└── utils/
    └── api.ts                  # API client with 3-tier fallback
```

---

## Components

### AvatarVideo (`components/Avatar/AvatarVideo.tsx`)

Displays a looped video of a professional receptionist with state-based visual overlays:

| State | Visual Effect |
|-------|---------------|
| `idle` | Blue border, subtle shadow |
| `speaking` | Green glow, gradient overlay |
| `listening` | Purple pulse with animated sound waves |
| `thinking` | Amber glow with spinning loader |

The video is responsive (up to `max-w-md`) with a 3:4 aspect ratio and rounded corners.

### ChatBox (`components/Chat/ChatBox.tsx`)

Scrollable container that displays conversation history. Automatically scrolls to the latest message. Shows an empty state prompt when there are no messages.

### ChatBubble (`components/Chat/ChatBubble.tsx`)

Individual message bubble with distinct styling for AI (blue, left-aligned) and user (gray, right-aligned) messages. Displays an optional timestamp.

### MicButton (`components/MicButton.tsx`)

Microphone button with visual feedback. Automatically detects browser support for speech recognition and shows a warning message if unavailable.

### VisitorForm (`components/Forms/VisitorForm.tsx`)

Voice-enabled form that captures visitor name, phone, and course interest. Fields can be auto-filled via speech. Includes a submit handler and success confirmation.

### HandoffButton (`components/HandoffButton.tsx`)

One-click button to transfer the conversation to a human agent. Disabled during AI processing.

---

## Response Pipeline

The chat system uses a 3-tier fallback architecture:

```
User Input
    │
    ▼
1️⃣ Hardcoded Keywords (instant, no API needed)
    │
    ├── Match found → Return response immediately
    │
    └── No match → Go to tier 2
                     │
                     ▼
2️⃣ Groq API (llama3-8b-8192, requires API key)
                     │
                     ├── Success → Return AI response
                     │
                     └── Fail/No key → Go to tier 3
                              │
                              ▼
3️⃣ AI Engine (Gemini API on localhost:3001)
                              │
                              ├── Success → Return AI response
                              │
                              └── Fail → Return default message
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_GROQ_API_KEY` | No | — | Groq API key for fast AI responses |
| `NEXT_PUBLIC_GROQ_MODEL` | No | `llama3-8b-8192` | Groq model to use |
| `NEXT_PUBLIC_AI_ENGINE_URL` | No | `http://localhost:3001` | URL of the AI engine server |

---

## Browser Support

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Speech Recognition | ✅ | ✅ | ⚠️ Partial | ❌ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| Video autoplay | ✅ | ✅ | ✅ | ✅ |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Speech recognition not working | Use Chrome or Edge |
| Video not playing | Ensure `avatar-video.mp4` exists in `public/avatar/` |
| Blank page on build | Run `npm run build` and check for TypeScript errors |
| API not responding | Ensure AI engine is running on port 3001 |
| Chat getting default responses | Check if Groq API key is set, or start the AI engine |
