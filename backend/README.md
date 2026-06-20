# ⚙️ Backend — Web Dev #3 Ka Folder

## Tumhara Kaam:
1. Next.js API routes banana
2. Form filling logic
3. Data models (visitor, appointment)
4. Sab integrations ko ek jagah connect karna

---

## API Routes (`/api/`)

### `/api/chat` — AI Se Baat Karo

```javascript
// backend/api/chat.js
// Ya Next.js mein: /app/api/chat/route.js

import { askGemini } from '../../ai-engine/conversation/geminiClient';
import { getPromptForBusiness } from '../../ai-engine/prompts/school-prompt';

export async function POST(request) {
  const { message, businessType, conversationHistory } = await request.json();
  
  // Business ke hisaab se prompt lo
  const systemPrompt = getPromptForBusiness(businessType);
  
  // Gemini se jawab lo
  const aiResponse = await askGemini(message, systemPrompt, conversationHistory);
  
  return Response.json({ 
    reply: aiResponse,
    timestamp: new Date().toISOString()
  });
}
```

### `/api/submit-form` — Visitor Form Submit

```javascript
// backend/api/submit-form.js

import { bookAppointment } from '../../integrations/appointments/bookAppointment';
import { sendWhatsAppConfirmation } from '../../integrations/whatsapp/sendConfirmation';
import { logConversation } from '../../integrations/analytics/logConversation';

export async function POST(request) {
  const formData = await request.json();
  
  // 1. Appointment book karo
  const appointment = bookAppointment({
    name: formData.name,
    phone: formData.phone,
    date: formData.date,
    time: formData.time,
    purpose: formData.purpose
  });
  
  // 2. WhatsApp confirmation bhejo
  await sendWhatsAppConfirmation({
    visitorName: formData.name,
    visitorPhone: formData.phone,
    appointmentTime: `${formData.date} - ${formData.time}`,
    businessName: formData.businessName
  });
  
  // 3. Log karo
  logConversation({
    visitorPhone: formData.phone,
    messages: formData.conversationHistory,
    duration: formData.duration,
    outcome: 'appointment_booked'
  });
  
  return Response.json({ 
    success: true, 
    appointmentId: appointment.id,
    message: 'Appointment confirm ho gayi! WhatsApp check karein.'
  });
}
```

---

## Data Models (`/models/`)

### Visitor Model

```javascript
// models/visitor.js
// Abhi simple object — baad mein database schema banega

const VisitorSchema = {
  id: 'number',           // timestamp
  name: 'string',         // "Ahmed Khan"
  phone: 'string',        // "03001234567"
  purpose: 'string',      // "admission inquiry" | "appointment" | "info"
  visitTime: 'string',    // ISO timestamp
  language: 'string',     // "urdu" | "english"
  source: 'string',       // "walk-in" | "website"
};

// Yeh baad mein MongoDB ya Supabase schema banega
module.exports = { VisitorSchema };
```

---

## Form Filling Flow

```
User bolta hai: "Mujhe appointment chahiye"
        ↓
AI puchta hai: "Aapka naam kya hai?"
        ↓
User: "Ahmed"
        ↓
AI puchta hai: "Phone number?"
        ↓
User: "0300..."
        ↓
AI puchta hai: "Kab ana chahte ho?"
        ↓
Form complete → /api/submit-form call → WhatsApp confirmation
```

### Form State Management

```javascript
// hooks/useFormFilling.js (frontend mein)

const [formData, setFormData] = useState({
  name: '',
  phone: '',
  date: '',
  time: '',
  purpose: ''
});

const [currentField, setCurrentField] = useState('name');

// AI ke jawab se field detect karo aur fill karo
function extractAndFill(aiResponse, userMessage) {
  if (currentField === 'name') {
    setFormData(prev => ({ ...prev, name: userMessage }));
    setCurrentField('phone');
  } else if (currentField === 'phone') {
    setFormData(prev => ({ ...prev, phone: userMessage }));
    setCurrentField('date');
  }
  // ... aur fields
}
```

---

## ✅ Week 1-4 Checklist — Web Dev #3

- [ ] `/api/chat` route bana aur test kiya
- [ ] `/api/submit-form` route ready
- [ ] Visitor model define kiya
- [ ] Form filling flow AI ke saath connect kiya
- [ ] Sab APIs ek saath test kiye
