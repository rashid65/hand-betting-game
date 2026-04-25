import type { StateCreator } from 'zustand'

import { DEFAULT_HAND_SIZE, createInitialGameState, resolveBet, startGame as startGameLogic } from '../gameLogic'
import type { GameSlice, GameStore, RandomSource } from '../gameStoreTypes'

// Manages the active game session and all bet-driven state transitions.
export const createGameSlice: StateCreator<GameStore, [], [], GameSlice> = (set, get) => ({
    phase: 'landing',
    score: 0,
    round: 0,
    currentHand: [],
    previousHands: [],
    nonNumberTileValues: {},
    lastBetResult: null,
    gameOverReason: null,
    startGame: (rng: RandomSource = Math.random, handSize: number = DEFAULT_HAND_SIZE) => {
        const nextState = startGameLogic({ ...get(), leaderboard: get().leaderboard }, rng, handSize)

        set(nextState)
    },
    playBet: (bet, rng: RandomSource = Math.random, handSize: number = DEFAULT_HAND_SIZE) => {
        const nextState = resolveBet({ ...get(), leaderboard: get().leaderboard }, bet, rng, handSize)

        set(nextState)
    },
    betHigher: (rng: RandomSource = Math.random, handSize: number = DEFAULT_HAND_SIZE) => {
        get().playBet('higher', rng, handSize)
    },
    betLower: (rng: RandomSource = Math.random, handSize: number = DEFAULT_HAND_SIZE) => {
        get().playBet('lower', rng, handSize)
    },
    resetGame: () => {
        set({ ...createInitialGameState(get().leaderboard) })
    },
})