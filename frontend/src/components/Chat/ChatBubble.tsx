'use client';

import { useState, useEffect } from 'react';

interface ChatBubbleProps {
  message: string;
  isAI: boolean;
  timestamp?: string;
}

export default function ChatBubble({ message, isAI, timestamp }: ChatBubbleProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isAI
            ? 'bg-blue-500 text-white rounded-bl-none'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-br-none'
          }`}
      >
        <p>{message}</p>
        {mounted && timestamp && (
          <span className={`text-[10px] mt-1 block opacity-60 ${isAI ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
