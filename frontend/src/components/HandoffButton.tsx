'use client';

interface HandoffButtonProps {
  onHandoff: () => void;
  disabled?: boolean;
}

export default function HandoffButton({ onHandoff, disabled = false }: HandoffButtonProps) {
  return (
    <button
      onClick={onHandoff}
      disabled={disabled}
      className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
        border-2 border-amber-400 text-amber-600 dark:text-amber-400
        hover:bg-amber-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800"
    >
      📞 Contact Human Agent
    </button>
  );
}
