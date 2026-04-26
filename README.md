# Hand Betting Game

Web-based Mahjong Hand Betting Game built with React, TypeScript, Vite, and Zustand.


## Live Goal

The player bets whether the next hand total will be higher or lower.
The game ends when either:

- Any non-number tile reaches value 0 or 10
- The draw pile depletes for the third time

## Features

- Landing page with:
  - New Game entry point
  - Top 5 leaderboard preview
- Game screen with:
  - Current hand total and Mahjong tile visuals
  - Bet Higher / Bet Lower actions
  - Draw pile, discard pile, and depletion counters
  - Exit game action back to landing
  - Compact history bar of previous hands
- Game Over screen with:
  - Final score and rounds played
  - Save score flow to leaderboard
  - Play again / back home actions
- Leaderboard screen:
  - Top 5 scores persisted in local storage

## Stack

- React 19
- TypeScript
- Vite
- Zustand (state management + persistence)
- React Router

## Project Structure

This project follows an extension-ready structure:

- src/types: domain and state types
- src/constants: game configuration/constants
- src/store: Zustand store, slices, game logic
- src/hooks: adapters around store behavior
- src/utils: pure helper functions
- src/components/tiles: tile rendering and history tile UI
- src/components/game: game-specific UI blocks
- src/components/screens: route-level screen UIs
- src/components/ui: reusable UI primitives
- src/pages: lightweight route wrappers

## Setup

### Requirements

- Node.js 20+
- npm 10+

### Install

1. Open a terminal in this folder:
   hand-betting
2. Install dependencies:

   npm install

### Run Development Server

npm run dev

### Build for Production

npm run build

### Preview Production Build

npm run preview

## Scoring and Rules Summary

- Number tiles: value equals face value
- Non-number tiles (winds/dragons): start at value 5
- Dynamic scaling:
  - If a non-number tile is in a winning hand, that tile value +1
  - If a non-number tile is in a losing hand, that tile value -1
- Deck reshuffle:
  - When draw pile is empty, combine discard pile with a fresh deck and shuffle
  - Third depletion ends the game

## Handwritten vs AI Assistance

I used a mix of handwritten implementation and AI-assisted support.

- Handwritten:
  - Project wiring, architectural decisions, state flow, and final review
  - Functional checks and output validation
- AI-assisted:
  - Drafting/refining UI sections, copy text, and repetitive refactors
  - Iterative cleanup and formatting support

All AI-generated output was reviewed, edited, and validated before final submission.
