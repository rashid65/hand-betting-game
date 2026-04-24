import {
  COPIES_PER_TILE,
  DRAGON_FACES,
  NON_NUMBER_BASE_VALUE,
  NUMBER_FACES,
  NUMBER_SUITS,
  WIND_FACES,
} from '../constants/gameConstants'
import type { Tile } from '../types/types'

// Builds a stable key for tracking individual non-number tile values.
const getNonNumberTileKey = (tile: Pick<Tile, 'type' | 'face'>): string =>
  `${tile.type}:${tile.face}`

// Creates a fresh deck using current dynamic values for winds and dragons.
export const createDeck = (
  nonNumberTileValues: Record<string, number> = {},
): Tile[] => {
  const deck: Tile[] = []
  let index = 0

  for (const suit of NUMBER_SUITS) {
    for (const face of NUMBER_FACES) {
      for (let copy = 0; copy < COPIES_PER_TILE; copy += 1) {
        deck.push({
          id: `number-${suit}-${face}-${copy}-${index}`,
          type: 'number',
          face,
          value: face,
        })
        index += 1
      }
    }
  }

  for (const face of WIND_FACES) {
    for (let copy = 0; copy < COPIES_PER_TILE; copy += 1) {
      const tile: Tile = {
        id: `wind-${face}-${copy}-${index}`,
        type: 'wind',
        face,
        value:
          nonNumberTileValues[getNonNumberTileKey({ type: 'wind', face })] ??
          NON_NUMBER_BASE_VALUE,
      }
      deck.push(tile)
      index += 1
    }
  }

  for (const face of DRAGON_FACES) {
    for (let copy = 0; copy < COPIES_PER_TILE; copy += 1) {
      const tile: Tile = {
        id: `dragon-${face}-${copy}-${index}`,
        type: 'dragon',
        face,
        value:
          nonNumberTileValues[getNonNumberTileKey({ type: 'dragon', face })] ??
          NON_NUMBER_BASE_VALUE,
      }
      deck.push(tile)
      index += 1
    }
  }

  return deck
}

// Returns a new shuffled copy of a deck using Fisher-Yates.
export const shuffleDeck = <T>(deck: readonly T[], rng: () => number = Math.random): T[] => {
  const shuffled = [...deck]

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

// Calculates the total value of a hand.
export const calculateHandValue = (hand: readonly Tile[]): number =>
  hand.reduce((total, tile) => total + tile.value, 0)

export interface ReshuffleResult {
  drawPile: Tile[]
  discardPile: Tile[]
  didReshuffle: boolean
}

// Rebuilds the draw pile when empty by combining discard and a fresh deck, then shuffling.
export const reshuffle = (
  drawPile: readonly Tile[],
  discardPile: readonly Tile[],
  nonNumberTileValues: Record<string, number> = {},
  rng: () => number = Math.random,
): ReshuffleResult => {
  if (drawPile.length > 0) {
    return {
      drawPile: [...drawPile],
      discardPile: [...discardPile],
      didReshuffle: false,
    }
  }

  const freshDeck = createDeck(nonNumberTileValues)
  const combinedDeck = [...discardPile, ...freshDeck]

  return {
    drawPile: shuffleDeck(combinedDeck, rng),
    discardPile: [],
    didReshuffle: true,
  }
}
