'use client';

import { useRef, useEffect } from 'react';

type AvatarState = 'idle' | 'speaking' | 'listening' | 'thinking';

interface AvatarVideoProps {
  state?: AvatarState;
}

const stateStyles: Record<AvatarState, { border: string; shadow: string; label: string }> = {
  idle: {
    border: 'border-blue-400',
    shadow: 'shadow-blue-400/20',
    label: 'How can I help you today?',
  },
  speaking: {
    border: 'border-green-400',
    shadow: 'shadow-green-400/30',
    label: 'Speaking...',
  },
  listening: {
    border: 'border-purple-400',
    shadow: 'shadow-purple-400/30',
    label: 'Listening...',
  },
  thinking: {
    border: 'border-amber-400',
    shadow: 'shadow-amber-400/30',
    label: 'Thinking...',
  },
};

export default function AvatarVideo({ state = 'idle' }: AvatarVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const s = stateStyles[state];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (state === 'speaking') {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div
        className={`relative w-full max-w-sm md:max-w-md aspect-[3/4] rounded-2xl overflow-hidden
          border-4 transition-all duration-500 ${s.border} shadow-2xl ${s.shadow}
          ${state === 'listening' ? 'animate-pulse' : ''}
          ${state === 'speaking' ? 'shadow-green-400/40' : ''}`}
      >
        <video
          ref={videoRef}
          src="/avatar/avatar-video.mp4"
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {state === 'listening' && (
          <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10">
            <div className="flex items-end gap-1 h-16">
              <div className="w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', height: '60%' }} />
              <div className="w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', height: '100%' }} />
              <div className="w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', height: '40%' }} />
              <div className="w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '100ms', height: '80%' }} />
              <div className="w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '250ms', height: '50%' }} />
            </div>
          </div>
        )}

        {state === 'thinking' && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-500/10">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {state === 'speaking' && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-500/10 to-transparent" />
        )}
      </div>

      <p className="mt-4 text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200 text-center transition-all duration-300">
        {s.label}
      </p>
    </div>
  );
}
