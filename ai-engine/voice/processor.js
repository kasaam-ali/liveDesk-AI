const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class VoiceProcessor {
  async speechToText(audioData) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Transcribe the following speech audio data to text. Return only the transcribed text, nothing else.\n\nAudio data (base64): ${audioData.substring(0, 100)}...`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Speech to text error:', error);
      return null;
    }
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