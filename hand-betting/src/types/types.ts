export type TileType = 'number' | 'wind' | 'dragon'

export interface Tile {
    id: string
    type: TileType

   // Number tiles use 1-9, while winds/dragons use named faces. 
    face: number | 'east' | 'south' | 'west' | 'north' | 'red' | 'green' | 'white'

   // Current value used for scoring and hand totals.
    value: number
}

export interface LeaderboardEntry {
    playerName: string
    score: number
    achievedAt: string
}

export type BetDirection = 'higher' | 'lower'

export interface BetResult {
    bet: BetDirection
    previousTotal: number
    nextTotal: number
    isWin: boolean
    scoreDelta: number
}

export type GamePhase = 'landing' | 'playing' | 'gameOver'

export interface GameState {
    phase: GamePhase
    score: number
    round: number
    drawPile: Tile[]
    discardPile: Tile[]
    currentHand: Tile[]
    previousHands: Tile[][]
    nonNumberTileValues: Record<string, number>
    reshuffleCount: number
    lastBetResult: BetResult | null
    leaderboard: LeaderboardEntry[]
    gameOverReason:
        | 'tile-value-limit-reached'
        | 'max-draw-pile-depletions-reached'
        | null
}
