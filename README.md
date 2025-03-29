# Tic Tac Toe Bolt

## About

- This is an extended version of the classic Tic-Tac-Toe game.
- User starts by marking a cell with "X". The opponent is an automated player (for "O").
- The additional rule with this game is that at any given time, there should not be more than 3 cells with the same entries.
- When a player has to make a move, its 3rd last move (if present) gets reverted to maintain the count. As a hint, the associated cell with that oldest move is dimmed while making a new move.
- The game only finishes when someone wins (the winning criterion is as per the original tic-tac-toe game).
- There is a Restart button, which stops the ongoing game and resets the state.

## App Components

### Core Game Components

- `src/core/` contains all the logic and the core components related to the game.
- The core game can be played and tested from the command line using `npx tsx src/text/gameplay.tsx` without the need of GUI.

### React Components

- There is a central gameplay context for the whole React app: `src/contexts/GameplayContext.tsx`. This context provider uses the core component `src/core/Game.tsx` to maintain the state related to the game.
- `src/components` contains all the visual components that interact with the user and make use of `GameplayContext`.
- Run `npm run dev` to open the app on the browser.
