# 🤖 LiveDesk AI — Visual AI Receptionist

> Ek AI receptionist jo kabhi thakta nahi, kabhi rude nahi hota, aur 24/7 kaam karta hai.

---

## 📌 Project Overview

LiveDesk AI ek animated AI avatar hai jo schools aur clinics ke front desk pe deploy hota hai.
Yeh Urdu aur English mein voice conversation karta hai, forms bharta hai, appointments book karta hai,
aur WhatsApp pe confirmation bhejta hai.

**Stack:** Next.js · Gemini API · Web Speech API · Twilio WhatsApp · Tailwind CSS

---

## 👥 Team Structure & Responsibilities

| Member | Role | Folder | Kaam |
|--------|------|--------|------|
| AI Dev #1 | AI Engine Lead | `/ai-engine/` | Gemini API, Conversation Flow, Prompt Engineering |
| AI Dev #2 | Voice & Speech | `/ai-engine/voice/` | Web Speech API, TTS, Accent Handling |
| Web Dev #1 | Frontend Lead | `/frontend/` | Next.js UI, Avatar Component, Chat Interface |
| Web Dev #2 | Integrations | `/integrations/` | WhatsApp, Appointment Booking |
| Web Dev #3 | Backend & Forms | `/backend/` | API Routes, Form Filling, Data Models |

---

## 🗂️ Folder Structure

```
livedesk-ai/
│
├── frontend/                  # Web Dev #1 ka kaam
│   ├── public/                # Static assets (avatar images, icons)
│   └── src/
│       ├── components/
│       │   ├── Avatar/        # Animated avatar component
│       │   ├── Chat/          # Chat bubble UI
│       │   └── Forms/         # Visitor form components
│       ├── hooks/             # Custom React hooks
│       ├── styles/            # Global CSS / Tailwind config
│       └── utils/             # Helper functions
│
├── ai-engine/                 # AI Dev #1 ka kaam
│   ├── prompts/               # Gemini system prompts (school, clinic, etc.)
│   ├── conversation/          # Conversation state management
│   └── voice/                 # AI Dev #2 — Web Speech API, TTS
│
├── integrations/              # Web Dev #2 ka kaam
│   ├── whatsapp/              # Twilio WhatsApp integration
│   ├── appointments/          # Appointment booking logic
│   └── analytics/             # Usage tracking, conversation logs
│
├── backend/                   # Web Dev #3 ka kaam
│   ├── api/                   # Next.js API routes
│   ├── middleware/            # Auth, rate limiting
│   └── models/                # Data schemas (visitor, appointment, etc.)
│
├── docs/                      # Documentation — sab likhte jaao
│   ├── SETUP.md
│   ├── API_DOCS.md
│   └── DEPLOYMENT.md
│
└── .github/
    ├── ISSUE_TEMPLATE/        # Bug report & feature request templates
    └── PULL_REQUEST_TEMPLATE/ # PR checklist
```

---

## 🚀 Week-by-Week MVP Plan

### ✅ Week 1 — "Baat Karo AI Se" (AI Devs Lead)
- [ ] Gemini API connect karo
- [ ] Web Speech API se mic input lo
- [ ] AI ka jawab awaaz mein sunao
- [ ] Basic Next.js page pe deploy karo

### ✅ Week 2 — "Script Daalo" (AI Dev #1 Lead)
- [ ] School/clinic ke liye system prompt likho
- [ ] Conversation flow banao (sawaal → jawab → follow-up)
- [ ] Avatar component frontend pe integrate karo

### ✅ Week 3 — "WhatsApp Bhejo" (Web Dev #2 Lead)
- [ ] Twilio free tier setup karo
- [ ] Visitor number lo, confirmation bhejo
- [ ] Appointment booking form complete karo

### ✅ Week 4 — "Real Jagah Pe Lagao" (Sab Milke)
- [ ] Ek real school ya clinic pe tablet deploy karo
- [ ] Real visitors se test karo
- [ ] Feedback note karo, bugs fix karo

---

## ⚙️ Quick Setup

```bash
# Repo clone karo
git clone https://github.com/YOUR_USERNAME/livedesk-ai.git
cd livedesk-ai

# Frontend setup
cd frontend
npm install
npm run dev

# .env file banao (sample neeche hai)
cp .env.example .env.local
```

---

## 🔑 Environment Variables

```env
# Gemini API
GEMINI_API_KEY=your_key_here

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📋 Git Rules — Sab Ko Follow Karna Hai

```
✅ Apne folder ke bahar kaam mat karo bina puchhe
✅ Har commit mein clear message likho (Urdu ya English)
✅ Direct main branch pe push mat karo
✅ Apna kaam karte waqt apni branch banao
✅ Jab kaam complete ho, Pull Request banao
```

### Branch Naming Convention
```
feature/ai-gemini-connect     ← AI Dev #1
feature/voice-speech-api      ← AI Dev #2
feature/avatar-component      ← Web Dev #1
feature/whatsapp-integration  ← Web Dev #2
feature/backend-api-routes    ← Web Dev #3
```

---

## 🐛 Issue Report Karna

Koi bug mile ya koi cheez kaam na kare?
GitHub Issues mein likho — template already set hai.

---

## 📞 Contact / Project Lead

LiveDesk AI Team
Built with ❤️ in Pakistan
