import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createDeckSlice } from './slices/deckSlice'
import { createGameSlice } from './slices/gameSlice'
import { createLeaderboardSlice } from './slices/leaderboardSlice'
import type { GameStore } from './gameStoreTypes'

// Root Zustand store composed from deck, game, and leaderboard slices.
export const useGameStore = create<GameStore>()(
    persist(
        (...args) => ({
            ...createDeckSlice(...args),
            ...createGameSlice(...args),
            ...createLeaderboardSlice(...args),
        }),
        {
            name: 'hand-betting-game-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                leaderboard: state.leaderboard,
            }),
        },
    ),
)