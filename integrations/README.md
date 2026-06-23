# LiveDesk AI — Integrations

[![Twilio](https://img.shields.io/badge/Twilio-F22F46?logo=twilio)](https://twilio.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)

Third-party service integrations for WhatsApp messaging, appointment booking, and analytics logging.

---

## Table of Contents

- [Services Overview](#services-overview)
- [WhatsApp (Twilio)](#whatsapp-twilio)
- [Appointment Booking](#appointment-booking)
- [Analytics](#analytics)
- [Environment Variables](#environment-variables)

---

## Services Overview

| Service | Module | Purpose | API Key Required |
|---------|--------|---------|------------------|
| WhatsApp | `whatsapp/sendConfirmation.js` | Send appointment confirmations | Twilio SID + Token |
| Appointments | `appointments/bookAppointment.js` | Manage bookings | None (in-memory) |
| Analytics | `analytics/logConversation.js` | Log conversations | None (in-memory) |

---

## WhatsApp (Twilio)

### Setup

1. Create a free account at [twilio.com](https://twilio.com)
2. Activate the WhatsApp Sandbox (Settings > WhatsApp Sandbox)
3. Note your Account SID, Auth Token, and Sandbox Number

### Usage

```javascript
import { sendWhatsAppConfirmation } from './whatsapp/sendConfirmation.js';

await sendWhatsAppConfirmation({
  visitorName: 'Ahmed Khan',
  visitorPhone: '03001234567',
  appointmentTime: '2026-06-25 - 10:00 AM',
  businessName: 'Saylani Mass IT',
});
```

**Returns:** Message SID string (or simulated ID if Twilio is not configured).

**Note:** The Twilio SDK is optional. The function logs a message and returns a simulated ID if credentials are not set.

---

## Appointment Booking

### Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `bookAppointment(data)` | Create a new appointment | Appointment object |
| `getAllAppointments()` | List all appointments | Array of appointments |
| `getAppointmentsByDate(date)` | Filter by date | Array of appointments |

### Appointment Schema

```javascript
{
  id: 'apt-1712345678000',
  name: 'Ahmed Khan',
  phone: '03001234567',
  date: '2026-06-25',
  time: '10:00 AM',
  purpose: 'admission inquiry',
  createdAt: '2026-06-23T10:30:00.000Z',
  status: 'confirmed'
}
```

---

## Analytics

### Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `logConversation(data)` | Record a conversation | Log entry object |
| `getStats()` | Get aggregate statistics | Stats object |

### Stats Schema

```javascript
{
  totalConversations: 42,
  appointmentsBooked: 15,
  avgDuration: 185  // seconds
}
```

### Outcomes

| Value | Description |
|-------|-------------|
| `appointment_booked` | Visitor booked an appointment |
| `info_given` | Visitor received information |
| `escalated_to_human` | Transferred to human agent |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TWILIO_ACCOUNT_SID` | For WhatsApp | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | For WhatsApp | Twilio auth token |
| `TWILIO_WHATSAPP_NUMBER` | For WhatsApp | Twilio WhatsApp number |
