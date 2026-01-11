# Copilot Instructions for Soc Ops

Social Bingo app for in-person mixers: React 19, TypeScript, Vite, Tailwind CSS v4.

## Development Checklist
Before commits, verify:
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm test` all tests pass

## Architecture
**State Flow**: `App.tsx` → `useBingoGame` hook → presentational components (StartScreen, GameScreen, BingoBoard)
- Custom hook [`useBingoGame.ts`](../src/hooks/useBingoGame.ts) manages all state + localStorage persistence
- Pure logic in [`bingoLogic.ts`](../src/utils/bingoLogic.ts) separated from React (Fisher-Yates shuffle, win detection)
- 5×5 board: center (index 12) = FREE SPACE, win = 5 in row/column/diagonal
- Immutable updates: functions return new arrays/objects, `winningSquareIds` uses Set<number>

## Commands
- `npm run dev` - Vite dev server http://localhost:5173
- `npm test` - Vitest (watch disabled)
- `npm run lint` - ESLint + TypeScript

## Code Conventions
**Tailwind v4**: CSS-first config via `@theme` in [`index.css`](../src/index.css) - NO tailwind.config.js. Use `@import 'tailwindcss';` not `@tailwind`. Custom properties: `--color-accent`, `--color-marked`, `--color-bingo`.

**TypeScript**: Types in [`types/index.ts`](../src/types/index.ts). Re-export from utils. Strict localStorage validation with versioned schema (`validateStoredData`).

**Data**: Questions in [`questions.ts`](../src/data/questions.ts) - string array, 24 random + 1 FREE_SPACE per board.

**Testing**: Pure functions in [`bingoLogic.test.ts`](../src/utils/bingoLogic.test.ts) with mocked Math.random. Test immutability.

## Key Files
- [`useBingoGame.ts`](../src/hooks/useBingoGame.ts) - State management
- [`bingoLogic.ts`](../src/utils/bingoLogic.ts) - Game logic
- [`questions.ts`](../src/data/questions.ts) - Content
- [`index.css`](../src/index.css) - Tailwind v4 theme

## Design
Follow `frontend-design.instructions.md` - avoid generic AI aesthetics. Mobile-first with `aspect-square` grids, `active:` states for touch. Color semantics: accent (interactive), marked (selected), bingo (win).
