# ⚙️ LiveDesk AI — Setup Guide

## Pehli Baar Setup Karna

### 1. Repo Clone Karo
```bash
git clone https://github.com/YOUR_USERNAME/livedesk-ai.git
cd livedesk-ai
```

### 2. Environment Variables Set Karo
```bash
cp .env.example .env.local
# Ab .env.local file kholo aur apni keys daalo
```

### 3. Frontend Install Karo
```bash
cd frontend
npm install
npm run dev
```

### 4. Browser mein kholo
```
http://localhost:3000
```

---

## API Keys Kahan Se Milenge

| Key | Website | Cost |
|-----|---------|------|
| GEMINI_API_KEY | aistudio.google.com | FREE |
| TWILIO keys | twilio.com | FREE (sandbox) |

---

## Git Workflow — Roz Ka Kaam

```bash
# Pehle latest code lo
git pull origin main

# Apni branch banao
git checkout -b feature/tumhara-kaam

# Kaam karo...

# Changes add karo
git add .

# Commit karo — clear message likho
git commit -m "feat: Gemini API se connection add kiya"

# Push karo
git push origin feature/tumhara-kaam

# GitHub pe jaao → Pull Request banao
```

---

## Common Errors

### "API key not found"
→ `.env.local` file check karo — sahi jagah hai?

### "Module not found"
→ `npm install` dobara chalaao

### "Port already in use"
→ `npm run dev -- -p 3001` use karo
