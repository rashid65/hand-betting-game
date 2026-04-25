import type { StateCreator } from 'zustand'

import { createInitialGameState } from '../gameLogic'
import type { DeckSlice, GameStore } from '../gameStoreTypes'

// Manages the draw and discard piles plus the reshuffle counter.
export const createDeckSlice: StateCreator<GameStore, [], [], DeckSlice> = (set) => ({
    drawPile: [],
    discardPile: [],
    reshuffleCount: 0,
    setDeckState: (nextState) =>
        set({
            drawPile: nextState.drawPile,
            discardPile: nextState.discardPile,
            reshuffleCount: nextState.reshuffleCount,
        }),
    resetDeckState: () =>
        set({
            drawPile: createInitialGameState().drawPile,
            discardPile: createInitialGameState().discardPile,
            reshuffleCount: createInitialGameState().reshuffleCount,
        }),
})