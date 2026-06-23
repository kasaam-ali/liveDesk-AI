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
        className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm"
        style={{
          backgroundColor: isAI ? '#e94560' : '#111438',
          color: '#ffffff',
          borderRadius: isAI ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
        }}
      >
        <p>{message}</p>
        {mounted && timestamp && (
          <span className="text-[10px] mt-1 block" style={{ opacity: 0.6, color: isAI ? '#ffb3c0' : '#8892b0' }}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
