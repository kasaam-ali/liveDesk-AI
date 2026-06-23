# LiveDesk AI — Integrations

Third-party service integrations for WhatsApp messaging, appointment booking, and analytics logging.

## Services

### WhatsApp (Twilio)

Sends appointment confirmation messages to visitors via WhatsApp.

**Setup:**
1. Create a free account at [twilio.com](https://twilio.com)
2. Activate the WhatsApp Sandbox
3. Copy your Account SID and Auth Token
4. Set environment variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_NUMBER`

**Usage:**
```javascript
import { sendWhatsAppConfirmation } from './whatsapp/sendConfirmation.js';

await sendWhatsAppConfirmation({
  visitorName: 'Ahmed Khan',
  visitorPhone: '03001234567',
  appointmentTime: '2026-01-20 - 10:00 AM',
  businessName: 'Saylani Mass IT',
});
```

### Appointment Booking

In-memory appointment management system. Replace with a database in production.

**Functions:**
- `bookAppointment(data)` — Create a new appointment
- `getAllAppointments()` — List all appointments
- `getAppointmentsByDate(date)` — Filter appointments by date

### Analytics

Conversation logging and statistics tracking.

**Functions:**
- `logConversation(data)` — Record a conversation
- `getStats()` — Get aggregate statistics (total conversations, appointments booked, average duration)

## Environment Variables

| Variable               | Description                |
|------------------------|----------------------------|
| `TWILIO_ACCOUNT_SID`   | Twilio account SID         |
| `TWILIO_AUTH_TOKEN`    | Twilio auth token          |
| `TWILIO_WHATSAPP_NUMBER` | Twilio WhatsApp number   |
