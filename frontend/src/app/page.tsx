'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Avatar3D from '@/components/Avatar3D/Avatar3D';
import ChatBox from '@/components/Chat/ChatBox';
import type { Message } from '@/components/Chat/ChatBox';
import MicButton from '@/components/MicButton';
import VisitorForm from '@/components/Forms/VisitorForm';
import HandoffButton from '@/components/HandoffButton';
import Header from '@/components/Layout/Header';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { sendChatMessage, submitVisitorForm } from '@/utils/api';
import { extractFormData } from '@/lib/voice-forms';
import type { AvatarState, VisitorData } from '@/types';

let messageCounter = 0;
function nextId() {
  return `msg-${++messageCounter}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const autoStarted = useRef(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      text: 'Assalam-o-Alaikum! I am LiveDesk AI, your virtual receptionist. How can I help you today?',
      sender: 'ai',
    },
  ]);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [handoffRequested, setHandoffRequested] = useState(false);
  const [autoFilledField, setAutoFilledField] = useState<string | undefined>();
  const [interimText, setInterimText] = useState('');

  const addMessage = useCallback((text: string, sender: 'user' | 'ai') => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        text,
        sender,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const formDataRef = useRef<{ name?: string; phone?: string; course?: string }>({});

  const appendLog = (entry: { visitorName?: string; phone?: string; course?: string; handoffRequested?: boolean }) => {
    try {
      const raw = localStorage.getItem('livedesk_logs');
      const logs = raw ? JSON.parse(raw) : [];
      logs.push({ ...entry, timestamp: new Date().toISOString(), handoffRequested: !!entry.handoffRequested });
      localStorage.setItem('livedesk_logs', JSON.stringify(logs.slice(-200)));
    } catch {}
  };

  const {
    isListening,
    isSupported,
    interimText: sttInterim,
    start: startListening,
    stop: stopListening,
    speak,
  } = useSpeechRecognition({
    onInterim: (text) => {
      setInterimText(text);
      const parsed = extractFormData(text);
      if (parsed.name && !formDataRef.current.name) {
        formDataRef.current.name = parsed.name;
        setAutoFilledField('name');
        setTimeout(() => setAutoFilledField(undefined), 2000);
      }
      if (parsed.phone && !formDataRef.current.phone) {
        formDataRef.current.phone = parsed.phone;
        setAutoFilledField('phone');
        setTimeout(() => setAutoFilledField(undefined), 2000);
      }
      if (parsed.course && !formDataRef.current.course) {
        formDataRef.current.course = parsed.course;
        setAutoFilledField('course');
        setTimeout(() => setAutoFilledField(undefined), 2000);
      }
    },
    onResult: (transcript) => {
      setInterimText('');
      addMessage(transcript, 'user');
      setIsProcessing(true);
      setAvatarState('thinking');

      sendChatMessage(transcript)
        .then((response) => {
          setAvatarState('speaking');
          addMessage(response.text, 'ai');
          speak(response.text, 'en', () => {
            setIsProcessing(false);
            setAvatarState('listening');
            startListening();
          });
        })
        .catch(() => {
          setIsProcessing(false);
          addMessage(
            'I apologize, but I am having trouble connecting. Please try again or contact a human agent.',
            'ai'
          );
          setAvatarState('listening');
          startListening();
        });
    },
    onError: () => {
      addMessage('Voice recognition error. Please try typing your query.', 'ai');
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !isSupported || autoStarted.current) return;
    autoStarted.current = true;
    const timer = setTimeout(() => {
      setAvatarState('listening');
      startListening();
    }, 1500);
    return () => clearTimeout(timer);
  }, [isClient, isSupported, startListening]);

  const handleMicStart = () => {
    setAvatarState('listening');
    startListening();
  };

  const handleMicStop = () => {
    stopListening();
    setAvatarState('idle');
  };

  const handleFormSubmit = async (data: VisitorData) => {
    appendLog({ visitorName: data.name, phone: data.phone, course: data.course });
    try {
      await submitVisitorForm(data);
      addMessage(
        `Thank you, ${data.name}! Your information has been submitted. We will contact you regarding the ${data.course} course.`,
        'ai'
      );
      speak(`Thank you ${data.name}! Your information has been submitted successfully.`);
    } catch {
      addMessage('There was an error submitting your information. Please try again.', 'ai');
    }
  };

  const handleHandoff = () => {
    setHandoffRequested(true);
    appendLog({ handoffRequested: true });
    addMessage('Connecting you to a human agent. Please wait a moment...', 'ai');
    setTimeout(() => {
      addMessage('Hello! I am a human agent. How can I assist you today?', 'ai');
    }, 3000);
  };

  if (!isClient) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#0a0e27' }} />;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pb-8 min-h-screen">
      <Header />

      <div className="w-full space-y-6">
        <Avatar3D state={avatarState} />

        <div style={{ backgroundColor: '#141738', borderColor: '#1e2248' }} className="rounded-2xl shadow-sm border h-80 flex flex-col">
          <ChatBox messages={messages} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <MicButton
            isListening={isListening}
            isDisabled={isProcessing}
            isSupported={isSupported}
            onStart={handleMicStart}
            onStop={handleMicStop}
          />
          {interimText && (
            <p className="text-sm animate-pulse text-center max-w-sm" style={{ color: '#8892b0' }}>
              {interimText}
            </p>
          )}
        </div>

        <VisitorForm onFormSubmit={handleFormSubmit} autoFilledField={autoFilledField} />

        {!handoffRequested && (
          <HandoffButton onHandoff={handleHandoff} disabled={isProcessing} />
        )}
      </div>
    </div>
  );
}
