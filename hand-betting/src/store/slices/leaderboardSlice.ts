import type { StateCreator } from 'zustand'

import { updateLeaderboard } from '../gameLogic'
import type { GameStore, LeaderboardSlice } from '../gameStoreTypes'

// Keeps the leaderboard sorted and limited to the top five scores.
export const createLeaderboardSlice: StateCreator<GameStore, [], [], LeaderboardSlice> = (
    set,
    get,
) => ({
    leaderboard: [],
    setLeaderboard: (entries) => {
        set({ leaderboard: [...entries].sort((a, b) => b.score - a.score).slice(0, 5) })
    },
    addLeaderboardEntry: (entry) => {
        set({ leaderboard: updateLeaderboard(get().leaderboard, entry) })
    },
    clearLeaderboard: () => {
        set({ leaderboard: [] })
    },
})