import { NON_NUMBER_BASE_VALUE } from '../constants/gameConstants'
import type {
    BetDirection,
    BetResult,
    GameState,
    LeaderboardEntry,
    Tile,
} from '../types/types'
import { calculateHandValue, createDeck, reshuffle, shuffleDeck } from '../utils/gameUtils'

// Default number of tiles drawn for each hand.
export const DEFAULT_HAND_SIZE = 2
// Points awarded for a winning bet.
export const WIN_SCORE_DELTA = 1
// Points deducted for a losing bet.
export const LOSE_SCORE_DELTA = -1
// Maximum number of draw-pile depletions before game over.
export const MAX_DRAW_PILE_DEPLETIONS = 3

interface DrawHandResult {
    hand: Tile[]
    drawPile: Tile[]
    discardPile: Tile[]
    reshuffleCount: number
    hitMaxDepletions: boolean
}

// Creates the canonical key used to track dynamic non-number tile values.
const toNonNumberTileKey = (tile: Pick<Tile, 'type' | 'face'>): string =>
    `${tile.type}:${tile.face}`

// Returns true when the tile is a wind or dragon.
const isNonNumberTile = (tile: Tile): boolean => tile.type !== 'number'

// Applies dynamic non-number tile scaling based on hand outcome.
export const applyHandResultToNonNumberValues = (
    nonNumberTileValues: Record<string, number>,
    hand: readonly Tile[],
    didWin: boolean,
): Record<string, number> => {
    const nextValues = { ...nonNumberTileValues }
    const delta = didWin ? 1 : -1

    for (const tile of hand) {
        if (!isNonNumberTile(tile)) {
            continue
        }

    const key = toNonNumberTileKey(tile)
    const currentValue = nextValues[key] ?? NON_NUMBER_BASE_VALUE
    nextValues[key] = currentValue + delta
    }

    return nextValues
}

// Detects game over when any dynamic non-number value reaches 0 or 10.
export const hasTileValueLimitReached = (
    nonNumberTileValues: Record<string, number>,
): boolean => Object.values(nonNumberTileValues).some((value) => value <= 0 || value >= 10)

// Draws a full hand with automatic reshuffling logic and depletion counting.
export const drawHand = (
    drawPile: readonly Tile[],
    discardPile: readonly Tile[],
    handSize: number,
    nonNumberTileValues: Record<string, number>,
    reshuffleCount: number,
    rng: () => number,
): DrawHandResult => {
    let workingDrawPile = [...drawPile]
    let workingDiscardPile = [...discardPile]
    let workingReshuffleCount = reshuffleCount
    const hand: Tile[] = []

    while (hand.length < handSize) {
        if (workingDrawPile.length === 0) {
            workingReshuffleCount += 1

            if (workingReshuffleCount >= MAX_DRAW_PILE_DEPLETIONS) {
                return {
                    hand,
                    drawPile: workingDrawPile,
                    discardPile: workingDiscardPile,
                    reshuffleCount: workingReshuffleCount,
                    hitMaxDepletions: true,
                }
            }
            const reshuffled = reshuffle(
                workingDrawPile,
                workingDiscardPile,
                nonNumberTileValues,
                rng,
            )

            workingDrawPile = reshuffled.drawPile
            workingDiscardPile = reshuffled.discardPile

            if (workingDrawPile.length === 0) {
                break
            }
        }

        const nextTile = workingDrawPile.pop()

        if (!nextTile) {
            break
        }

        hand.push(nextTile)
    }

    return {
        hand,
        drawPile: workingDrawPile,
        discardPile: workingDiscardPile,
        reshuffleCount: workingReshuffleCount,
        hitMaxDepletions: false,
    }
}

// Creates the default state used before a session starts.
export const createInitialGameState = (
    leaderboard: LeaderboardEntry[] = [],
): GameState => ({
    phase: 'landing',
    score: 0,
    round: 0,
    drawPile: [],
    discardPile: [],
    currentHand: [],
    previousHands: [],
    nonNumberTileValues: {},
    reshuffleCount: 0,
    lastBetResult: null,
    leaderboard,
    gameOverReason: null,
})

// Starts a new game by creating and drawing the first hand.
export const startGame = (
    state: GameState,
    rng: () => number = Math.random,
    handSize: number = DEFAULT_HAND_SIZE,
): GameState => {
    const seededDeck = shuffleDeck(createDeck(state.nonNumberTileValues), rng)
    const firstDraw = drawHand(
        seededDeck,
        [],
        handSize,
        state.nonNumberTileValues,
        0,
        rng,
    )

    const gameOverReason = firstDraw.hitMaxDepletions
        ? 'max-draw-pile-depletions-reached'
        : null

    return {
        ...state,
        phase: gameOverReason ? 'gameOver' : 'playing',
        score: 0,
        round: gameOverReason ? 0 : 1,
        drawPile: firstDraw.drawPile,
        discardPile: firstDraw.discardPile,
        currentHand: firstDraw.hand,
        previousHands: [],
        reshuffleCount: firstDraw.reshuffleCount,
        lastBetResult: null,
        gameOverReason,
    }
}

// Resolves a higher/lower bet and returns the next immutable game state.
export const resolveBet = (
    state: GameState,
    bet: BetDirection,
    rng: () => number = Math.random,
    handSize: number = DEFAULT_HAND_SIZE,
): GameState => {
    if (state.phase !== 'playing' || state.currentHand.length === 0) {
        return state
    }

    const previousTotal = calculateHandValue(state.currentHand)
    const drawResult = drawHand(
        state.drawPile,
        [...state.discardPile, ...state.currentHand],
        handSize,
        state.nonNumberTileValues,
        state.reshuffleCount,
        rng,
    )

    if (drawResult.hitMaxDepletions || drawResult.hand.length < handSize) {
        return {
            ...state,
            phase: 'gameOver',
            drawPile: drawResult.drawPile,
            discardPile: drawResult.discardPile,
            reshuffleCount: drawResult.reshuffleCount,
            gameOverReason: 'max-draw-pile-depletions-reached',
        }
    }

    const nextTotal = calculateHandValue(drawResult.hand)
    const didWin = bet === 'higher' ? nextTotal > previousTotal : nextTotal < previousTotal
    const scoreDelta = didWin ? WIN_SCORE_DELTA : LOSE_SCORE_DELTA

    const nonNumberTileValues = applyHandResultToNonNumberValues(
        state.nonNumberTileValues,
        drawResult.hand,
        didWin
    )

    const tileLimitReached = hasTileValueLimitReached(nonNumberTileValues)

    const lastBetResult: BetResult = {
        bet,
        previousTotal,
        nextTotal,
        isWin: didWin,
        scoreDelta,
    }

    return {
        ...state,
        phase: tileLimitReached ? 'gameOver' : 'playing',
        score: state.score + scoreDelta,
        round: state.round + 1,
        drawPile: drawResult.drawPile,
        discardPile: drawResult.discardPile,
        currentHand: drawResult.hand,
        previousHands: [...state.previousHands, state.currentHand],
        nonNumberTileValues,
        reshuffleCount: drawResult.reshuffleCount,
        lastBetResult,
        gameOverReason: tileLimitReached ? 'tile-value-limit-reached' : null,
    }
}

// Appends a score and returns a sorted top-five leaderboard.
export const updateLeaderboard = (
    leaderboard: readonly LeaderboardEntry[],
    entry: LeaderboardEntry,
): LeaderboardEntry[] =>
    [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
