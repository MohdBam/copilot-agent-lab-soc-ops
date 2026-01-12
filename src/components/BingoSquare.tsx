import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border rounded-[var(--radius-sm)] transition-all select-none min-h-[60px] text-xs leading-tight';

  let stateClasses = '';
  let glowClass = '';

  if (square.isFreeSpace) {
    // FREE space: cyan border with soft glow
    stateClasses = 'glass-surface scanlines border-accent text-accent font-bold text-sm';
    glowClass = 'glow-accent';
  } else if (square.isMarked) {
    if (isWinning) {
      // Winning marked: amber glow
      stateClasses = 'bg-bingo/20 border-bingo text-[#FFD859] font-semibold';
      glowClass = 'glow-bingo-strong';
    } else {
      // Marked: magenta border with glow
      stateClasses = 'glass-surface border-marked text-[#E2E8F0]';
      glowClass = 'glow-marked';
    }
  } else {
    // Unmarked: glass surface
    stateClasses = 'glass-surface border-[#1F2937] text-[#94A3B8] hover:border-accent/40 hover:text-[#E2E8F0] active:scale-[0.98]';
  }

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${glowClass}`}
      style={{
        transitionDuration: 'var(--dur-fast)',
        transitionTimingFunction: 'var(--ease-standard)'
      }}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      {/* Corner brackets for marked tiles */}
      {square.isMarked && !square.isFreeSpace && (
        <>
          <span className="absolute top-0.5 left-0.5 text-marked text-[8px]">◢</span>
          <span className="absolute top-0.5 right-0.5 text-marked text-[8px]">◣</span>
        </>
      )}

      <span className="wrap-break-word hyphens-auto">{square.text}</span>

      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute bottom-0.5 right-1 text-marked text-xs font-bold">✓</span>
      )}
    </button>
  );
}
