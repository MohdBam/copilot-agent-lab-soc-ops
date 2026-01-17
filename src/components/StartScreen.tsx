interface StartScreenProps {
  onStart: () => void;
}

const PREVIEW_QUESTIONS = [
  "has a pet",
  "speaks 2+ languages",
  "loves cooking",
  "plays an instrument"
];

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-6 sm:px-6 sm:py-8 relative overflow-hidden">
      {/* Hero background gradient with scanlines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 scanlines hero-gradient-bg"></div>
      </div>

      {/* Ambient edge glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-accent"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-marked"></div>
      </div>

      <div className="text-center max-w-xl relative z-10 w-full">
        {/* Hero headline */}
        <div className="mb-6 sm:mb-8 fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 leading-tight hero-title-gradient">
            Break the Ice.<br />Meet Your People.
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-md mx-auto">
            Connect through conversation. Play social bingo to discover what makes your team unique.
          </p>
        </div>
        
        {/* Feature bullets */}
        <div className="mb-6 sm:mb-8 fade-in-up fade-in-delay-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#94A3B8]">
              <span className="text-accent text-lg">✓</span>
              <span>Start conversations</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#94A3B8]">
              <span className="text-accent text-lg">✓</span>
              <span>Learn fun facts</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#94A3B8]">
              <span className="text-accent text-lg">✓</span>
              <span>Build connections</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#94A3B8]">
              <span className="text-accent text-lg">✓</span>
              <span>Win together</span>
            </div>
          </div>
        </div>

        {/* 2x2 Preview Grid */}
        <div className="mb-6 sm:mb-8 fade-in-up fade-in-delay-2">
          <p className="text-xs uppercase tracking-wider text-[#64748B] mb-3">Preview</p>
          <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
            {PREVIEW_QUESTIONS.map((question, index) => (
              <div
                key={index}
                className="glass-surface aspect-square rounded-[var(--radius-sm)] border border-accent flex items-center justify-center p-3 text-xs sm:text-sm text-center text-[#E2E8F0] cursor-default select-none"
              >
                {question}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="fade-in-up fade-in-delay-3">
          <button
            onClick={onStart}
            className="w-full max-w-xs mx-auto block bg-accent text-[#0A0F14] font-bold py-4 px-8 rounded-[var(--radius-md)] text-lg transition-all glow-accent hover:glow-accent-strong hover:scale-[1.02] active:scale-[0.98]"
            style={{
              transitionDuration: 'var(--dur-mid)',
              transitionTimingFunction: 'var(--ease-spring)'
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
