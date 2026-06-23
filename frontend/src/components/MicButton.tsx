'use client';

interface MicButtonProps {
  isListening: boolean;
  isDisabled?: boolean;
  isSupported: boolean;
  onClick: () => void;
}

export default function MicButton({
  isListening,
  isDisabled = false,
  isSupported,
  onClick,
}: MicButtonProps) {
  if (!isSupported) {
    return (
      <p className="text-sm text-amber-600 dark:text-amber-400 text-center max-w-xs">
        Speech recognition is not available in this browser. Please use Chrome or Edge.
      </p>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-20 h-20 rounded-full text-white text-3xl shadow-lg transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isListening
          ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-red-500/50'
          : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-blue-600/30'
        }
      `}
      aria-label={isListening ? 'Stop listening' : 'Start listening'}
      title={isListening ? 'Click to stop' : 'Hold to speak'}
    >
      {isListening ? '⏹' : '🎤'}
    </button>
  );
}
