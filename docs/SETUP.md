# LiveDesk AI — Setup Guide

## First-Time Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/livedesk-ai.git
cd livedesk-ai
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
# Open .env.local and add your API keys
```

### 3. Start the AI Engine

```bash
cd ai-engine
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm install
npm run dev
```

The AI engine will start on `http://localhost:3001`.

### 4. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome or Edge.

## Obtaining API Keys

| Key               | Source                                          | Cost  |
|-------------------|-------------------------------------------------|-------|
| GEMINI_API_KEY    | [Google AI Studio](https://aistudio.google.com) | Free  |
| TWILIO keys       | [Twilio](https://twilio.com)                    | Free (sandbox) |

## Daily Workflow

```bash
# Pull latest changes
git pull origin main

# Create a feature branch
git checkout -b feature/your-task

# Make your changes...

# Stage and commit
git add .
git commit -m "feat: add new feature description"

# Push to GitHub
git push origin feature/your-task

# Create a Pull Request on GitHub
```

## Troubleshooting

| Problem                    | Solution                                    |
|----------------------------|---------------------------------------------|
| "API key not found"        | Check that .env file exists and keys are set correctly |
| "Module not found"         | Run `npm install` again                     |
| "Port already in use"      | Use `npm run dev -- -p 3002`                |
| Speech recognition not working | Use Chrome or Edge browser              |
