import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode } from '../types';
import {
  generateBoard,
  generateScavengerList,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';

export interface BingoGameState {
  gameState: GameState;
  gameMode: GameMode;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
}

export interface BingoGameActions {
  startGame: (mode: GameMode) => void;
  handleSquareClick: (squareId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  gameState: GameState;
  gameMode: GameMode;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
}

function isValidSquare(sq: unknown): boolean {
  if (!sq || typeof sq !== 'object') return false;
  const square = sq as Record<string, unknown>;
  return (
    typeof square.id === 'number' &&
    typeof square.text === 'string' &&
    typeof square.isMarked === 'boolean' &&
    typeof square.isFreeSpace === 'boolean'
  );
}

function isValidWinningLine(line: unknown): boolean {
  if (!line || typeof line !== 'object') return false;
  const lineObj = line as Record<string, unknown>;
  return (
    typeof lineObj.type === 'string' &&
    ['row', 'column', 'diagonal'].includes(lineObj.type) &&
    typeof lineObj.index === 'number' &&
    Array.isArray(lineObj.squares)
  );
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) return false;
  
  if (typeof obj.gameState !== 'string' || !['start', 'playing', 'bingo'].includes(obj.gameState)) {
    return false;
  }

  if (typeof obj.gameMode !== 'string' || !['bingo', 'scavenger'].includes(obj.gameMode)) {
    return false;
  }
  
  const validBoardLengths = [0, 24, 25];
  if (!Array.isArray(obj.board) || !validBoardLengths.includes(obj.board.length)) {
    return false;
  }
  
  if (!obj.board.every(isValidSquare)) return false;
  
  if (obj.winningLine !== null && !isValidWinningLine(obj.winningLine)) {
    return false;
  }
  
  return true;
}

function loadGameState(): Pick<BingoGameState, 'gameState' | 'gameMode' | 'board' | 'winningLine'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        gameMode: parsed.gameMode,
        board: parsed.board,
        winningLine: parsed.winningLine,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  gameState: GameState,
  gameMode: GameMode,
  board: BingoSquareData[],
  winningLine: BingoLine | null
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      gameMode,
      board,
      winningLine,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [gameMode, setGameMode] = useState<GameMode>(
    () => loadedState?.gameMode || 'bingo'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, gameMode, board, winningLine);
  }, [gameState, gameMode, board, winningLine]);

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setBoard(mode === 'bingo' ? generateBoard() : generateScavengerList());
    setWinningLine(null);
    setShowBingoModal(false);
    setGameState('playing');
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);

      if (gameMode !== 'bingo') {
        return newBoard;
      }
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [gameMode, winningLine]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setBoard([]);
    setWinningLine(null);
    setShowBingoModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  return {
    gameState,
    gameMode,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  };
}
