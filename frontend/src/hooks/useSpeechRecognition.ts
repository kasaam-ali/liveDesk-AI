'use client';

import { useState, useCallback, useRef } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface UseSpeechRecognitionOptions {
  language?: string;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  start: () => void;
  stop: () => void;
  speak: (text: string, lang?: string, onEnd?: () => void) => void;
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const { language = 'en', onResult, onError } = options;
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  onResultRef.current = onResult;
  onErrorRef.current = onError;

  const SpeechRecognitionCtor =
    typeof window !== 'undefined'
      ? (window as unknown as Record<string, new () => SpeechRecognitionInstance>).SpeechRecognition ||
        (window as unknown as Record<string, new () => SpeechRecognitionInstance>).webkitSpeechRecognition
      : undefined;

  const isSupported = !!SpeechRecognitionCtor;

  const start = useCallback(() => {
    if (!SpeechRecognitionCtor) {
      onError?.('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResultRef.current?.(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      onErrorRef.current?.(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [SpeechRecognitionCtor, language, onResult, onError]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string, lang = 'en', onEnd?: () => void) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { isListening, isSupported, start, stop, speak };
}
