'use client';

import { useState, useCallback, useRef } from 'react';
import AvatarDisplay from '@/components/Avatar/AvatarDisplay';
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
  return `msg-${++messageCounter}-${Date.now()}`;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      text: 'Assalam-o-Alaikum! I am LiveDesk AI, your virtual receptionist. How can I help you today?',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [handoffRequested, setHandoffRequested] = useState(false);
  const [autoFilledField, setAutoFilledField] = useState<string | undefined>();
  const formRef = useRef<{ updateField: (field: string, value: string) => void } | null>(null);

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

  const handleSpeechResult = useCallback(
    async (transcript: string) => {
      if (isProcessing) return;
      addMessage(transcript, 'user');
      setIsProcessing(true);
      setAvatarState('thinking');

      try {
        const response = await sendChatMessage(transcript, sessionId);
        setAvatarState('speaking');
        addMessage(response.text, 'ai');

        setTimeout(() => setAvatarState('idle'), 2000);
      } catch {
        addMessage(
          'I apologize, but I am having trouble connecting to my AI engine. Please try again or contact a human agent.',
          'ai'
        );
        setAvatarState('idle');
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, sessionId, addMessage]
  );

  const {
    isListening,
    isSupported,
    start: startListening,
    stop: stopListening,
    speak,
  } = useSpeechRecognition({
    onResult: handleSpeechResult,
    onError: (error) => {
      console.error(error);
      addMessage('There was an issue with voice recognition. Please try typing your query.', 'ai');
    },
  });

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
      speak(
        `Thank you ${data.name}! Your information has been submitted successfully.`
      );
    } catch {
      addMessage(
        'There was an error submitting your information. Please try again.',
        'ai'
      );
    }
  };

  const handleHandoff = () => {
    setHandoffRequested(true);
    addMessage(
      'Connecting you to a human agent. Please wait a moment...',
      'ai'
    );
    setTimeout(() => {
      addMessage(
        'Hello! I am a human agent. How can I assist you today?',
        'ai'
      );
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 pb-8 min-h-screen">
      <Header />

      <div className="w-full space-y-6">
        <AvatarDisplay state={avatarState} />

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 h-80 flex flex-col">
          <ChatBox messages={messages} />
        </div>

        <div className="flex justify-center">
          {!isSupported ? (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              Speech recognition is not available in this browser. Please use Chrome or Edge.
            </p>
          ) : (
            <MicButton
              isListening={isListening}
              isDisabled={isProcessing}
              onClick={handleMicClick}
            />
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
