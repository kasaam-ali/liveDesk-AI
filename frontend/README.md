# LiveDesk AI — Frontend

The frontend is a **Next.js 16** application with TypeScript and Tailwind CSS that provides the user interface for the AI receptionist.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Web Speech API** (browser-native speech-to-text and text-to-speech)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page — LiveDesk AI interface
│   └── globals.css         # Global styles
├── components/
│   ├── Avatar/
│   │   └── AvatarDisplay.tsx  # AI avatar with real images (idle, speaking, listening, thinking)
│   ├── Chat/
│   │   ├── ChatBubble.tsx     # Individual chat message bubble
│   │   └── ChatBox.tsx        # Scrollable chat message container
│   ├── Forms/
│   │   └── VisitorForm.tsx    # Voice-enabled visitor information form
│   ├── Layout/
│   │   └── Header.tsx         # Application header
│   ├── HandoffButton.tsx      # Human agent handoff button
│   └── MicButton.tsx          # Microphone button with visual feedback
├── hooks/
│   └── useSpeechRecognition.ts  # Web Speech API hook
├── types/
│   └── index.ts               # TypeScript type definitions
└── utils/
    └── api.ts                  # API client for AI engine
```

## Features

- **Real Avatar**: Displays a professional receptionist portrait that transitions through idle, speaking, listening, and thinking states with smooth CSS animations.
- **Voice Conversation**: Uses the Web Speech API for speech-to-text and text-to-speech in both English and Urdu.
- **Chat Interface**: Scrollable chat bubble UI showing the conversation history.
- **Visitor Form**: Voice-enabled form that captures visitor name, phone, and course interest.
- **Human Handoff**: One-click transfer to a human agent when the AI cannot handle a query.
- **Dark Mode**: Full dark mode support via Tailwind CSS.

## Avatar States

| State      | Description                        | Image Source                |
|------------|------------------------------------|-----------------------------|
| idle       | Neutral, awaiting user input       | `public/avatar/avatar-idle.jpg` |
| speaking   | AI is responding to the user       | `public/avatar/avatar-speaking.jpg` |
| listening  | AI is listening to user speech     | `public/avatar/avatar-listening.jpg` |
| thinking   | AI is processing the user request  | `public/avatar/avatar-thinking.jpg` |

## Environment Variables

| Variable                    | Description              | Default               |
|-----------------------------|--------------------------|-----------------------|
| `NEXT_PUBLIC_AI_ENGINE_URL` | URL of the AI engine API | `http://localhost:3001` |

## Browser Support

Speech recognition requires a browser that supports the Web Speech API:
- **Google Chrome** (recommended)
- **Microsoft Edge**
- **Safari** (partial support)
