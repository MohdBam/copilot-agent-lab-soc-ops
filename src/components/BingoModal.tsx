interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div 
        className="glass-surface scanlines rounded-[var(--radius-lg)] border border-bingo/40 p-6 max-w-xs w-full text-center glow-bingo-strong"
        style={{
          animation: 'bounce 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {/* Cyan accent strip at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>
        
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold text-bingo mb-2 tracking-tight" style={{
          textShadow: '0 0 20px rgba(255, 216, 89, 0.6)'
        }}>
          BINGO!
        </h2>
        <p className="text-[#94A3B8] mb-6">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-accent text-[#0A0F14] font-bold py-3 px-6 rounded-[var(--radius-md)] transition-all glow-accent hover:glow-accent-strong active:scale-[0.98]"
          style={{
            transitionDuration: 'var(--dur-mid)',
            transitionTimingFunction: 'var(--ease-spring)'
          }}
        >
          KEEP PLAYING
        </button>
      </div>
    </div>
  );
}
