# 🖥️ Frontend — Web Dev #1 Ka Folder

## Tumhara Kaam:
1. Next.js project setup
2. Avatar component banana
3. Chat interface banana
4. Poora UI integrate karna

---

## Setup Karo — Pehle Din

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --app
npm run dev
# localhost:3000 pe khulega
```

---

## Components Jo Banana Hai:

### 1. Avatar Component (`/src/components/Avatar/`)

```jsx
// Avatar/AvatarDisplay.jsx
// Pehle sirf ek image ya GIF — baad mein animated

export default function AvatarDisplay({ isSpeaking }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`rounded-full overflow-hidden w-48 h-48 border-4 
        ${isSpeaking ? 'border-green-400 animate-pulse' : 'border-blue-300'}`}>
        <img 
          src="/avatar-idle.png"     // Public folder mein daalo
          alt="LiveDesk AI"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-3 text-lg font-semibold text-white">
        {isSpeaking ? '🎤 Bol raha hoon...' : 'Salam! Kya main help kar sakta hoon?'}
      </p>
    </div>
  );
}
```

### 2. Chat Bubble (`/src/components/Chat/`)

```jsx
// Chat/ChatBubble.jsx
export default function ChatBubble({ message, isAI }) {
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}>
      <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm
        ${isAI 
          ? 'bg-blue-100 text-blue-900 rounded-tl-none' 
          : 'bg-green-500 text-white rounded-tr-none'
        }`}>
        {message}
      </div>
    </div>
  );
}
```

### 3. Mic Button

```jsx
// Main page pe yeh button hoga
<button
  onClick={toggleListening}
  className={`w-20 h-20 rounded-full text-white text-3xl shadow-lg
    ${isListening 
      ? 'bg-red-500 animate-pulse' 
      : 'bg-blue-600 hover:bg-blue-700'
    }`}>
  {isListening ? '⏹' : '🎤'}
</button>
```

---

## Main Page Layout (`/src/app/page.jsx`)

```
┌─────────────────────────────┐
│                             │
│      [AVATAR IMAGE]         │  ← Center mein
│   "Salam! Help chahiye?"    │
│                             │
│  ┌───────────────────────┐  │
│  │ Chat bubbles yahan    │  │  ← Scroll hone wala area
│  │ AI: Kya poochna hai?  │  │
│  │ User: Fee kya hai?    │  │
│  └───────────────────────┘  │
│                             │
│         [ 🎤 ]              │  ← Mic button neeche
│                             │
└─────────────────────────────┘
```

---

## ✅ Week 1 Checklist — Web Dev #1

- [ ] Next.js project banaya aur chala
- [ ] Avatar image public folder mein daali
- [ ] AvatarDisplay component bana
- [ ] Basic page layout ready
- [ ] AI team ke saath mic button connect kiya
