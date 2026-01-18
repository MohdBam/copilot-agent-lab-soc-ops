import type { BingoSquareData } from '../types';

interface ScavengerListProps {
  items: BingoSquareData[];
  completed: number;
  total: number;
  onSquareClick: (squareId: number) => void;
}

export function ScavengerList({ items, completed, total, onSquareClick }: ScavengerListProps) {
  return (
    <div className="flex-1 flex flex-col gap-3 p-4">
      <p className="text-center text-[#94A3B8] text-sm">
        Check off each prompt as you find matches.
      </p>

      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        className="glass-surface border border-[#334155] rounded-[var(--radius-md)] px-4 py-3 text-[#E2E8F0] text-sm"
      >
        Progress {completed}/{total}
      </div>

      <div className="flex-1 overflow-auto rounded-[var(--radius-md)] border border-[#334155] glass-surface p-3">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <label className="flex items-start gap-3 text-[#E2E8F0]">
                <input
                  type="checkbox"
                  checked={item.isMarked}
                  onChange={() => onSquareClick(item.id)}
                  className="accent-[var(--color-accent)] mt-1 h-4 w-4"
                />
                <span className="text-sm leading-snug">{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
