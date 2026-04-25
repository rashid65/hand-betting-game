import { useMemo } from 'react';
import { useGameStore } from '../store';
import type { LeaderboardEntry } from '../types/types';

export const useLeaderboard = () => {
  const leaderboard = useGameStore((state) => state.leaderboard);
  const addLeaderboardEntry = useGameStore((state) => state.addLeaderboardEntry);

  const topFive = useMemo(
    () => [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5),
    [leaderboard],
  );

  const saveScore = (playerName: string, score: number): void => {
    const normalizedName = playerName.trim();

    if (!normalizedName) {
      return;
    }

    addLeaderboardEntry({
      playerName: normalizedName,
      score,
      achievedAt: new Date().toISOString(),
    });
  };

  return {
    leaderboard,
    topFive,
    saveScore,
  } as {
    leaderboard: LeaderboardEntry[];
    topFive: LeaderboardEntry[];
    saveScore: (playerName: string, score: number) => void;
  };
};
