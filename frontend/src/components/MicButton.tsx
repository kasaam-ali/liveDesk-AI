'use client';

interface MicButtonProps {
  isListening: boolean;
  isDisabled?: boolean;
  isSupported: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function MicButton({
  isListening,
  isDisabled = false,
  isSupported,
  onStart,
  onStop,
}: MicButtonProps) {
  if (!isSupported) {
    return (
      <p className="text-sm text-center max-w-xs" style={{ color: '#e94560' }}>
        Speech recognition is not available in this browser. Please use Chrome or Edge.
      </p>
    );
  }

  return (
    <button
      onMouseDown={onStart}
      onTouchStart={onStart}
      onMouseUp={onStop}
      onMouseLeave={onStop}
      onTouchEnd={onStop}
      disabled={isDisabled}
      className={`
        w-20 h-20 rounded-full text-white text-3xl shadow-lg transition-all duration-300
        focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
        select-none active:scale-95
        ${isListening
          ? 'animate-pulse shadow-lg'
          : 'hover:scale-105'
        }
      `}
      style={{
        backgroundColor: isListening ? '#e94560' : '#4a9eff',
        boxShadow: isListening
          ? '0 0 30px rgba(233, 69, 96, 0.5)'
          : '0 4px 20px rgba(74, 158, 255, 0.3)'
      }}
      aria-label={isListening ? 'Release to stop' : 'Hold to speak'}
    >
      {isListening ? '⏹' : '🎤'}
    </button>
  );
}
