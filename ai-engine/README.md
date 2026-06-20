# 🧠 AI Engine — AI Dev #1 & AI Dev #2 Ka Folder

## AI Dev #1 — Tumhara Kaam (Gemini + Conversation)

### Kya Banana Hai:
1. Gemini API se connection
2. School/Clinic ke liye system prompts
3. Conversation ka flow manage karna

### Starting Point — Gemini Connect Karo:

```javascript
// ai-engine/conversation/geminiClient.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(userMessage, systemPrompt) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",  // Free tier
    systemInstruction: systemPrompt
  });

  const result = await model.generateContent(userMessage);
  return result.response.text();
}

module.exports = { askGemini };
```

### Prompts Folder Mein Yeh Files Banao:
- `school-prompt.js` — School receptionist ke liye
- `clinic-prompt.js` — Clinic/lab ke liye
- `base-prompt.js` — Common rules sab ke liye

### Example System Prompt:
```
Tum LiveDesk AI ho — XYZ School ke AI receptionist.
Tum sirf Urdu aur English mein jawab dete ho.
Tum yeh sawaalon ka jawab de sakte ho:
- Admission fees kya hai?
- Classes kab start hoti hain?
- School ki timing kya hai?
Agar koi aur sawaal ho toh kaho: "Iske liye main aapko human staff se connect karta hoon."
Hamesha warm aur respectful raho.
```

---

## AI Dev #2 — Tumhara Kaam (Voice)

### `/voice/` Folder Mein Yeh Banana Hai:

```javascript
// ai-engine/voice/speechInput.js
// Web Speech API — Browser mein mic se awaaz lo

export function startListening(onResult) {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'ur-PK';  // Urdu
  recognition.interimResults = false;
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  
  recognition.start();
  return recognition;
}
```

```javascript
// ai-engine/voice/speechOutput.js
// Text ko awaaz mein convert karo

export function speak(text, lang = 'ur-PK') {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;   // Thodi slow — clear sunai de
  utterance.pitch = 1.1;  // Friendly tone
  window.speechSynthesis.speak(utterance);
}
```

---

## ✅ Week 1 Checklist — AI Team

- [ ] `geminiClient.js` bana liya
- [ ] Ek test prompt se jawab aa raha hai console mein
- [ ] `speechInput.js` — mic se text aa raha hai
- [ ] `speechOutput.js` — text awaaz mein sun raha hai
- [ ] Teeno milake ek simple test: bolo → Gemini samjhe → jawab aaye awaaz mein
