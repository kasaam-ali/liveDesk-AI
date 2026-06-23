# Voice Processing Module

## Setup Instructions

### For Browser-Based Voice (Recommended for MVP)

The voice module uses Web Speech API which works directly in browsers [[8]][[12]].

**Frontend Integration:**
```javascript
// In your frontend code
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ur-PK'; // Urdu Pakistan
recognition.start();