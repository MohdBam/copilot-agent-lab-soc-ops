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

### Cyberpunk Neon Theme
**Visual System**: High-contrast dark UI with restrained neon accents (cyan/magenta/amber) and subtle tech textures.

**Palette**:
- **Primary (cyan)**: `--color-accent` (#00E8FF) - interactive elements, focus rings
- **Secondary (magenta)**: `--color-marked` (#FF3AC8) - marked squares, active states
- **Tertiary (amber)**: `--color-bingo` (#FFD859) - win states, celebrations
- **Backgrounds**: `--color-bg` (#0A0F14), `--color-bg-alt` (#0D1321), `--color-surface` (6% white overlay)
- **Text**: Primary (#E2E8F0), secondary (#94A3B8), muted (#64748B), inverse (#0A0F14)
- **Borders**: `--color-border` (#1F2937), `--color-border-strong` (#334155)

**Effects**:
- **Glows**: Max 2 shadow layers, 6-10px blur, ≤40% opacity. Utilities: `.glow-accent`, `.glow-marked`, `.glow-bingo` with `-strong` variants
- **Surfaces**: `.glass-surface` (translucent with backdrop blur), `.scanlines` (subtle 2px repeating lines)
- **Motion**: `--ease-standard`, `--ease-spring`, durations 120ms (fast), 200ms (mid), 300ms (slow)
- **Radius**: xs(4px), sm(6px), md(10px), lg(14px), xl(18px)

**Component Patterns**:
- **Tiles**: Glass surface, magenta border when marked, cyan border for FREE, amber glow on win
- **Buttons**: Cyan glow on hover/focus, scale 0.98 on active, 200ms spring easing
- **Modals**: Dim backdrop (70% black), glass card with cyan header strip
- **Win Animation**: 500ms amber sweep across winning path, settle to soft glow

**Accessibility**:
- Contrast ≥4.5:1 for text, ≥3:1 for borders
- `focus-visible` cyan rings on all interactive elements
- Touch targets ≥44px with distinct `active:` feedback
- `prefers-reduced-motion` disables all glows, sweeps, and animations
