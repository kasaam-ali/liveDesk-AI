'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type AvatarState = 'idle' | 'speaking' | 'listening' | 'thinking';

interface AvatarDisplayProps {
  state?: AvatarState;
}

const avatarImages: Record<AvatarState, string> = {
  idle: '/avatar/avatar-idle.jpg',
  speaking: '/avatar/avatar-speaking.jpg',
  listening: '/avatar/avatar-listening.jpg',
  thinking: '/avatar/avatar-thinking.jpg',
};

const statusText: Record<AvatarState, string> = {
  idle: 'How can I help you today?',
  speaking: 'Speaking...',
  listening: 'Listening...',
  thinking: 'Thinking...',
};

const stateColors: Record<AvatarState, string> = {
  idle: 'border-blue-400',
  speaking: 'border-green-400',
  listening: 'border-purple-400',
  thinking: 'border-amber-400',
};

export default function AvatarDisplay({ state = 'idle' }: AvatarDisplayProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`relative w-48 h-48 rounded-full overflow-hidden border-4 transition-all duration-500 
          ${stateColors[state]} 
          ${animating ? 'scale-105' : 'scale-100'}
          ${state === 'listening' ? 'animate-pulse shadow-lg shadow-purple-400/50' : ''}
          ${state === 'speaking' ? 'shadow-lg shadow-green-400/50' : ''}`}
      >
        <Image
          src={avatarImages[state]}
          alt={`AI avatar - ${state}`}
          fill
          className="object-cover"
          priority
          sizes="192px"
        />
        {state === 'listening' && (
          <div className="absolute inset-0 bg-purple-500/10 rounded-full" />
        )}
      </div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-200 transition-all duration-300">
        {statusText[state]}
      </p>
    </div>
  );
}
