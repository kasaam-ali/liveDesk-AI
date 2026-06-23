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
        disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
      style={{
        border: '2px solid #e94560',
        color: '#e94560',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e94560'; e.currentTarget.style.color = '#ffffff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e94560'; }}
    >
      📞 Contact Human Agent
    </button>
  );
}
