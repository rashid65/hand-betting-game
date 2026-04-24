// Wind tile faces used in the Mahjong deck.
export const WIND_FACES = ['east', 'south', 'west', 'north'] as const
// Dragon tile faces used in the Mahjong deck.
export const DRAGON_FACES = ['red', 'green', 'white'] as const
// Numbered tile faces from 1 through 9.
export const NUMBER_FACES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

// Number of duplicate copies for each unique tile face.
export const COPIES_PER_TILE = 4
// Number tile suit names used only for unique id generation.
export const NUMBER_SUITS = ['dots', 'bamboo', 'characters'] as const
// Starting value for non-number (wind/dragon) tiles.
export const NON_NUMBER_BASE_VALUE = 5