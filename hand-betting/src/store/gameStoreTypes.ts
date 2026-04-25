import type { BetDirection, BetResult, GamePhase, GameState, LeaderboardEntry, Tile } from '../types/types'

export type RandomSource = () => number

export interface DeckSlice {
    drawPile: Tile[]
    discardPile: Tile[]
    reshuffleCount: number
    setDeckState: (nextState: Pick<GameState, 'drawPile' | 'discardPile' | 'reshuffleCount'>) => void
    resetDeckState: () => void
}

export interface GameSlice {
    phase: GamePhase
    score: number
    round: number
    currentHand: Tile[]
    previousHands: Tile[][]
    nonNumberTileValues: Record<string, number>
    lastBetResult: BetResult | null
    gameOverReason: GameState['gameOverReason']
    startGame: (rng?: RandomSource, handSize?: number) => void
    playBet: (bet: BetDirection, rng?: RandomSource, handSize?: number) => void
    betHigher: (rng?: RandomSource, handSize?: number) => void
    betLower: (rng?: RandomSource, handSize?: number) => void
    resetGame: () => void
}

export interface LeaderboardSlice {
    leaderboard: LeaderboardEntry[]
    setLeaderboard: (entries: LeaderboardEntry[]) => void
    addLeaderboardEntry: (entry: LeaderboardEntry) => void
    clearLeaderboard: () => void
}

export type GameStore = DeckSlice & GameSlice & LeaderboardSlice