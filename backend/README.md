# LiveDesk AI — Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com)

Backend API routes that connect the frontend with the AI engine, handle form submissions, and coordinate third-party integrations.

---

## Table of Contents

- [Endpoints](#endpoints)
- [Middleware](#middleware)
- [Data Models](#data-models)
- [Environment Variables](#environment-variables)

---

## Endpoints

### `POST /api/chat`

Forward a message to the AI engine and receive a response.

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
  "text": "We offer Web Development, AI, Cloud Computing, and Graphic Design courses.",
  "metadata": {
    "sessionId": "session-1712345678",
    "timestamp": "2026-06-23T10:30:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What courses do you offer?", "sessionId": "test-123"}'
```

### `POST /api/submit-form`

Submit visitor information collected during conversation.

**Request:**
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
  "visitor": {
    "name": "Ahmed Khan",
    "phone": "03001234567",
    "course": "Web Development"
  },
  "message": "Thank you, Ahmed Khan! Your information has been recorded.",
  "timestamp": "2026-06-23T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Name, phone, and course are required"
}
```

---

## Middleware

### Rate Limiting (`middleware/rate-limit.js`)

Limits requests to **30 per minute** per IP address.

```javascript
import { rateLimit } from './middleware/rate-limit.js';
const { allowed, remaining, resetAt } = rateLimit(clientIp);
```

Used in production to prevent API abuse.

---

## Data Models

### Visitor (`models/visitor.js`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full name of the visitor |
| `phone` | string | ✅ | Contact phone number |
| `course` | string | ✅ | Course of interest |
| `purpose` | string | ❌ | Purpose of visit |
| `language` | string | ❌ | Preferred language |
| `source` | string | ❌ | How the visitor arrived |

```javascript
import { createVisitor } from './models/visitor.js';
const visitor = createVisitor({ name, phone, course });
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `GROQ_API_KEY` | ❌ | Groq fallback API key |
| `PORT` | ❌ | Server port (default: 3001) |
