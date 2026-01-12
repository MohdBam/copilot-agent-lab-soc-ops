import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header with glass surface */}
      <header className="flex items-center justify-between p-3 glass-surface border-b border-accent/30">
        <button
          onClick={onReset}
          className="text-[#94A3B8] text-sm px-3 py-1.5 rounded-[var(--radius-sm)] hover:text-accent hover:glow-accent transition-all active:scale-95"
          style={{
            transitionDuration: 'var(--dur-fast)'
          }}
        >
          ← Back
        </button>
        <h1 className="font-bold text-[#E2E8F0] tracking-wide">SOC OPS</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-[#94A3B8] text-sm py-3 px-4">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator with amber glow */}
      {hasBingo && (
        <div className="bg-bingo/20 border-y border-bingo text-[#FFD859] text-center py-2.5 font-bold text-sm tracking-wide glow-bingo">
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
