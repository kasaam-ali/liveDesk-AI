'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import AvatarVideo from '@/components/Avatar/AvatarVideo';
import ChatBox from '@/components/Chat/ChatBox';
import type { Message } from '@/components/Chat/ChatBox';
import MicButton from '@/components/MicButton';
import VisitorForm from '@/components/Forms/VisitorForm';
import HandoffButton from '@/components/HandoffButton';
import Header from '@/components/Layout/Header';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { sendChatMessage, submitVisitorForm } from '@/utils/api';
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

  const {
    isListening,
    isSupported,
    start: startListening,
    stop: stopListening,
    speak,
  } = useSpeechRecognition({
    onResult: (transcript) => {
      addMessage(transcript, 'user');
      setIsProcessing(true);
      setAvatarState('thinking');

      sendChatMessage(transcript, sessionId)
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

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      setAvatarState('idle');
    } else {
      setAvatarState('listening');
      startListening();
    }
  };

  const handleFormSubmit = async (data: VisitorData) => {
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
    addMessage('Connecting you to a human agent. Please wait a moment...', 'ai');
    setTimeout(() => {
      addMessage('Hello! I am a human agent. How can I assist you today?', 'ai');
    }, 3000);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-950" />;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pb-8 min-h-screen">
      <Header />

      <div className="w-full space-y-6">
        <AvatarVideo state={avatarState} />

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 h-80 flex flex-col">
          <ChatBox messages={messages} />
        </div>

        <div className="flex justify-center">
          <MicButton
            isListening={isListening}
            isDisabled={isProcessing}
            isSupported={isSupported}
            onClick={handleMicClick}
          />
        </div>

        <VisitorForm onFormSubmit={handleFormSubmit} />

        {!handoffRequested && (
          <HandoffButton onHandoff={handleHandoff} disabled={isProcessing} />
        )}
      </div>
    </div>
  );
}
