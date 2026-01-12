interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 relative">
      {/* Ambient edge glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#00E8FF]"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#FF3AC8]"></div>
      </div>

      <div className="text-center max-w-sm relative z-10">
        {/* Title with cyan gradient accent */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-tight mb-2" style={{
            background: 'linear-gradient(135deg, #00E8FF 0%, #7FEFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 20px rgba(0, 232, 255, 0.3)'
          }}>
            SOC OPS
          </h1>
          <p className="text-xl text-[#94A3B8] tracking-wide uppercase text-sm">Social Bingo</p>
        </div>
        
        {/* Glass card with scanlines */}
        <div className="glass-surface scanlines rounded-[var(--radius-lg)] p-6 border border-[#334155] mb-8">
          <h2 className="font-semibold text-[#E2E8F0] mb-4 text-lg">How to play</h2>
          <ul className="text-left text-[#94A3B8] text-sm space-y-2.5">
            <li className="flex items-start">
              <span className="text-accent mr-2 flex-shrink-0">▹</span>
              <span>Find people who match the questions</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2 flex-shrink-0">▹</span>
              <span>Tap a square when you find a match</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2 flex-shrink-0">▹</span>
              <span>Get 5 in a row to win!</span>
            </li>
          </ul>
        </div>

        {/* CTA with cyan glow */}
        <button
          onClick={onStart}
          className="w-full bg-accent text-[#0A0F14] font-bold py-4 px-8 rounded-[var(--radius-md)] text-lg transition-all glow-accent hover:glow-accent-strong active:scale-[0.98]"
          style={{
            transitionDuration: 'var(--dur-mid)',
            transitionTimingFunction: 'var(--ease-spring)'
          }}
        >
          START GAME
        </button>
      </div>
    </div>
  );
}
