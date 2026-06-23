# LiveDesk AI — Setup Guide

## Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later
- **Chrome** or **Edge** browser (for speech recognition)
- **Git** (for cloning the repository)

## Quick Setup

### 1. Clone and Install

```bash
git clone https://github.com/kasaam-ali/liveDesk-AI.git
cd liveDesk-AI
```

### 2. Start the AI Engine (Optional — for full AI features)

```bash
cd ai-engine
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm install
npm run dev
```

The AI engine runs on `http://localhost:3001`.

### 3. Start the Frontend

Open a new terminal:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome or Edge.

### 4. Test Without an AI Engine

The frontend works without the AI engine server. It uses hardcoded keyword responses and can optionally use the Groq API if you set `NEXT_PUBLIC_GROQ_API_KEY` in `.env.local`.

## Obtaining API Keys

| Key | Source | Cost | Setup Time |
|-----|--------|------|------------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | Free | 2 minutes |
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com) | Free | 2 minutes |
| `TWILIO_ACCOUNT_SID` | [Twilio](https://twilio.com) | Free (sandbox) | 5 minutes |
| `TWILIO_AUTH_TOKEN` | [Twilio](https://twilio.com) | Free (sandbox) | Same as above |

## Git Workflow

```bash
# Pull latest changes
git pull origin main

# Create a feature branch
git checkout -b feature/your-task

# Make changes, then stage and commit
git add .
git commit -m "feat: description of change"

# Push and create a Pull Request
git push origin feature/your-task
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `API key not found` | Check that `.env` or `.env.local` exists and the key is spelled correctly |
| `Module not found` | Run `npm install` in the affected directory |
| `Port already in use` | Use a different port: `npm run dev -- -p 3002` (frontend) or change `PORT` in `.env` (ai-engine) |
| `Speech recognition not working` | Open the page in Chrome or Edge |
| `Video not playing` | Ensure `frontend/public/avatar/avatar-video.mp4` exists |
| `Blank page on build` | Check the terminal for TypeScript or build errors |
| `Chat always returns default response` | The AI engine may not be running, or no Groq key is configured. Check the browser console (F12) for network errors. |
