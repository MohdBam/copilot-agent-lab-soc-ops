import { useState, type ReactNode } from 'react';

interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  accentColor: 'accent' | 'marked' | 'bingo';
  ariaLabel: string;
}

export function FlipCard({ frontContent, backContent, accentColor, ariaLabel }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  const glowClass = accentColor === 'accent' ? 'glow-accent' : 
                     accentColor === 'marked' ? 'glow-marked' : 'glow-bingo';
  const glowStrongClass = accentColor === 'accent' ? 'glow-accent-strong' : 
                          accentColor === 'marked' ? 'glow-marked-strong' : 'glow-bingo-strong';
  const borderColor = accentColor === 'accent' ? '#00E8FF' : 
                      accentColor === 'marked' ? '#FF3AC8' : '#FFD859';

  return (
    <div className="flip-card-container w-full h-64">
      <button
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-expanded={isFlipped}
        className="w-full h-full focus:outline-none"
        style={{
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          padding: 0,
        }}
      >
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flip-card-front">
            <div 
              className={`glass-surface scanlines rounded-[var(--radius-lg)] p-6 border-2 h-full flex items-center justify-center transition-all ${glowClass} hover:${glowStrongClass} hover:scale-105 active:scale-100`}
              style={{
                borderColor: borderColor,
                transitionDuration: 'var(--dur-mid)',
                transitionTimingFunction: 'var(--ease-spring)',
              }}
            >
              {frontContent}
            </div>
          </div>

          {/* Back */}
          <div className="flip-card-back">
            <div 
              className={`glass-surface scanlines rounded-[var(--radius-lg)] p-6 border-2 h-full flex flex-col justify-center transition-all ${glowClass}`}
              style={{
                borderColor: borderColor,
                transitionDuration: 'var(--dur-mid)',
                transitionTimingFunction: 'var(--ease-spring)',
              }}
            >
              {backContent}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
