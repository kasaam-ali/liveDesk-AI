# LiveDesk AI — Backend

Backend API routes that connect the frontend with the AI engine, handle form submissions, and coordinate integrations.

## API Endpoints

### `POST /api/chat`

Send a message to the AI engine and receive a response.

**Request Body:**
```json
{
  "message": "What courses do you offer?",
  "sessionId": "session-1234567890"
}
```

**Response:**
```json
{
  "text": "We offer Web Development, AI, Cloud Computing, and Graphic Design courses.",
  "metadata": {
    "sessionId": "session-1234567890",
    "timestamp": "2026-01-15T10:30:00.000Z"
  }
}
```

### `POST /api/submit-form`

Submit visitor information after a conversation.

**Request Body:**
```json
{
  "name": "Ahmed Khan",
  "phone": "03001234567",
  "course": "Web Development"
}
```

**Response:**
```json
{
  "success": true,
  "visitor": { "name": "Ahmed Khan", "phone": "03001234567", "course": "Web Development" },
  "message": "Thank you, Ahmed Khan! Your information has been recorded."
}
```

## Project Structure

```
backend/
├── api/
│   ├── chat.js          # Chat endpoint — connects to Gemini AI
│   └── submit-form.js   # Form submission endpoint
├── middleware/
│   └── rate-limit.js    # Rate limiting utility
└── models/
    └── visitor.js       # Visitor data schema
```

## Environment Variables

| Variable        | Description          |
|-----------------|----------------------|
| `GEMINI_API_KEY` | Google Gemini API key |
