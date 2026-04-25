import { useMemo } from 'react';
import { useGameStore } from '../store';
import { calculateHandValue } from '../utils/gameUtils';
import type { BetDirection, BetResult, GameState, Tile } from '../types/types';

export interface HistoryHand {
  id: string;
  tiles: Tile[];
  total: number;
}

const toHistoryId = (tiles: readonly Tile[], index: number): string =>
  `${index}-${tiles.map((tile) => tile.id).join('-')}`;

export const useGame = () => {
  const phase = useGameStore((state) => state.phase);
  const score = useGameStore((state) => state.score);
  const round = useGameStore((state) => state.round);
  const drawPileCount = useGameStore((state) => state.drawPile.length);
  const discardPileCount = useGameStore((state) => state.discardPile.length);
  const reshuffleCount = useGameStore((state) => state.reshuffleCount);
  const currentHand = useGameStore((state) => state.currentHand);
  const previousHands = useGameStore((state) => state.previousHands);
  const lastBetResult = useGameStore((state) => state.lastBetResult);
  const gameOverReason = useGameStore((state) => state.gameOverReason);

  const startGame = useGameStore((state) => state.startGame);
  const playBet = useGameStore((state) => state.playBet);
  const resetGame = useGameStore((state) => state.resetGame);

  const currentHandValue = useMemo(
    () => calculateHandValue(currentHand),
    [currentHand],
  );

  const historyHands = useMemo<HistoryHand[]>(
    () =>
      [...previousHands]
        .slice(-5)
        .reverse()
        .map((tiles, index) => ({
          id: toHistoryId(tiles, index),
          tiles,
          total: calculateHandValue(tiles),
        })),
    [previousHands],
  );

  const bet = (direction: BetDirection): void => {
    playBet(direction);
  };

  return {
    phase,
    score,
    round,
    drawPileCount,
    discardPileCount,
    reshuffleCount,
    currentHand,
    currentHandValue,
    historyHands,
    lastBetResult,
    gameOverReason,
    startGame,
    bet,
    resetGame,
  } as {
    phase: GameState['phase'];
    score: number;
    round: number;
    drawPileCount: number;
    discardPileCount: number;
    reshuffleCount: number;
    currentHand: Tile[];
    currentHandValue: number;
    historyHands: HistoryHand[];
    lastBetResult: BetResult | null;
    gameOverReason: GameState['gameOverReason'];
    startGame: () => void;
    bet: (direction: BetDirection) => void;
    resetGame: () => void;
  };
};
