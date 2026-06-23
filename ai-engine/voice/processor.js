class VoiceProcessor {
  async speechToText(audioData) {
    console.warn('STT requires a cloud provider (Groq Whisper or similar)');
    return null;
  }

  async textToSpeech(text, lang = 'en') {
    return { text, instruction: 'Use browser SpeechSynthesisUtterance for playback' };
  }

  textToSpeechBrowser(text, lang = 'en') {
    if (typeof window === 'undefined') return false;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  checkBrowserSupport() {
    if (typeof window === 'undefined') return { speechRecognition: false, speechSynthesis: false };
    return {
      speechRecognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
      speechSynthesis: !!window.speechSynthesis
    };
  }
}

module.exports = new VoiceProcessor();