'use client';

import { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
}

interface ChatBoxProps {
  messages: Message[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
        <p>Start a conversation by clicking the microphone button below.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg.text}
          isAI={msg.sender === 'ai'}
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
