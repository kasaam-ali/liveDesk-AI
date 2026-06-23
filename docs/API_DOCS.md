# LiveDesk AI — API Documentation

## AI Engine API

The AI engine runs as an Express server on port `3001` by default. It provides endpoints for chat and voice processing.

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "service": "LiveDesk AI Engine"
}
```

### `POST /api/chat`

Process a text message through the AI engine and return a response.

**Request Body:**
```json
{
  "message": "What courses are available?",
  "sessionId": "session-1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "text": "We offer Web Development, AI, Cloud Computing, and Graphic Design courses.",
  "audio": null,
  "metadata": {
    "sessionId": "session-1234567890",
    "timestamp": "2026-01-15T10:30:00.000Z"
  }
}
```

### `POST /api/voice`

Process audio data through the AI engine (speech-to-text → AI → text-to-speech).

**Request Body:**
```json
{
  "audioData": "<base64-encoded-audio>",
  "sessionId": "session-1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "originalText": "What courses do you have?",
  "responseText": "We offer Web Development, AI, and more.",
  "audio": "<base64-encoded-response-audio>"
}
```

## Backend API Routes

### `POST /api/chat`

Forward a message to the AI engine and return the response.

### `POST /api/submit-form`

Submit visitor information collected during conversation.

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
  "message": "Thank you, Ahmed Khan! Your information has been recorded.",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## Integration Services

### WhatsApp Confirmation

```javascript
sendWhatsAppConfirmation({
  visitorName: string,
  visitorPhone: string,
  appointmentTime: string,
  businessName: string
})
// Returns: message SID string
```

### Appointment Booking

```javascript
bookAppointment({
  name: string,
  phone: string,
  date: string,
  time: string,
  purpose: string
})
// Returns: appointment object

getAllAppointments()
// Returns: array of appointments

getAppointmentsByDate(date: string)
// Returns: array of appointments for the given date
```

### Analytics

```javascript
logConversation({
  visitorPhone: string,
  messages: array,
  duration: number,
  outcome: 'appointment_booked' | 'info_given' | 'escalated_to_human'
})
// Returns: log entry object

getStats()
// Returns: { totalConversations, appointmentsBooked, avgDuration }
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Description of what went wrong"
}
```

Common HTTP status codes:
- `200` — Success
- `400` — Bad request (missing or invalid parameters)
- `500` — Internal server error
