# 📱 Integrations — Web Dev #2 Ka Folder

## Tumhara Kaam:
1. WhatsApp confirmation messages
2. Appointment booking logic
3. Analytics/conversation logging

---

## WhatsApp Setup — Twilio Free Tier ($0)

### Step 1: Account Banao
1. twilio.com pe jaao — free account banao
2. WhatsApp Sandbox activate karo
3. Yeh numbers note karo:
   - Account SID
   - Auth Token
   - Sandbox Number: `whatsapp:+14155238886`

### Step 2: Code (`/whatsapp/sendConfirmation.js`)

```javascript
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsAppConfirmation({ 
  visitorName, 
  visitorPhone, 
  appointmentTime,
  businessName 
}) {
  const message = await client.messages.create({
    from: 'whatsapp:+14155238886',  // Twilio sandbox
    to: `whatsapp:+92${visitorPhone}`,  // Pakistan number
    body: `
🏫 *${businessName}*

Assalam o Alaikum *${visitorName}* ji! 

Aapki visit ka shukriya. ✅

📅 Appointment: *${appointmentTime}*

Koi sawal ho toh is number pe WhatsApp karein.
Shukriya! 🙏
    `
  });

  return message.sid;
}

module.exports = { sendWhatsAppConfirmation };
```

---

## Appointment Booking (`/appointments/bookAppointment.js`)

```javascript
// Simple appointment object — database baad mein lagenge
// Pehle sirf memory mein store karo

const appointments = [];

function bookAppointment({ name, phone, date, time, purpose }) {
  const appointment = {
    id: Date.now(),
    name,
    phone,
    date,
    time,
    purpose,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  
  appointments.push(appointment);
  console.log('✅ Appointment booked:', appointment);
  return appointment;
}

function getAllAppointments() {
  return appointments;
}

module.exports = { bookAppointment, getAllAppointments };
```

---

## Analytics (`/analytics/logConversation.js`)

```javascript
// Har conversation log karo — yeh data baad mein bahut kaam aayega

const conversationLogs = [];

function logConversation({ visitorPhone, messages, duration, outcome }) {
  const log = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    visitorPhone,
    messageCount: messages.length,
    duration,  // seconds mein
    outcome,   // 'appointment_booked' | 'info_given' | 'escalated_to_human'
    messages
  };
  
  conversationLogs.push(log);
  return log;
}

function getStats() {
  return {
    totalConversations: conversationLogs.length,
    appointmentsBooked: conversationLogs.filter(l => l.outcome === 'appointment_booked').length,
    avgDuration: conversationLogs.reduce((acc, l) => acc + l.duration, 0) / conversationLogs.length
  };
}

module.exports = { logConversation, getStats };
```

---

## ✅ Week 3 Checklist — Web Dev #2

- [ ] Twilio account bana liya
- [ ] Sandbox WhatsApp pe test message gaya
- [ ] `sendWhatsAppConfirmation()` kaam kar rahi hai
- [ ] Appointment booking function ready
- [ ] Conversation logging shuru ho gayi
