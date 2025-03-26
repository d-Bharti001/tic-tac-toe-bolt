import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TurnSequence } from "../core/TurnSequence";
import Player from "../core/Player";
import Cell, { CellPosition } from "../core/Cell";
import Game from "../core/Game";
import ManualPlayer from "../core/ManualPlayer";
import AutomatedPlayer from "../core/AutomatedPlayer";

export interface MutableGameState {
    currentTurnSequence: TurnSequence;
    completed: boolean;
    winner: Player | null;
    dimmedCell: Cell | null;
    winningCells: Cell[] | null;
}

export interface GameplayContextInterface {
    gameState: MutableGameState | null;
    createNewGame: () => void;
    createNewGameAndPlayFirstMove: (cellPosition: CellPosition) => void;
    getGame: () => Game | null;
    playNextMove: (player: Player, cellPosition: CellPosition) => void;
    reset: () => void;
}

const defaultState = {
    gameState: null,
} as GameplayContextInterface;

const GameplayContext = createContext<GameplayContextInterface>(defaultState);

export function useGameplay() {
    return useContext(GameplayContext);
}

export interface GameplayProviderProps {
    children: ReactNode;
}

export default function GameplayProvider({ children }: GameplayProviderProps) {
    const gameRef = useRef<Game | null>(null);
    const [gameState, setGameState] = useState<MutableGameState | null>(null);

    const getNewGameInstance = (): Game => {
        const playerA = new ManualPlayer("You");
        const playerB = new AutomatedPlayer("Computer");
        return Game.create(playerA, playerB);
    };

    const updateGameState = () => {
        const game = getGame();
        if (game) {
            const latestState: MutableGameState = {
                currentTurnSequence: game.getCurrentTurnSequence(),
                completed: game.isGameComplete(),
                winner: game.whoWonTheGame(),
                dimmedCell: game.getCellToBeReset(),
                winningCells: game.getWinningCells(),
            };
            setGameState(latestState);
        } else {
            setGameState(null);
        }
    };

    const getGame = () => {
        return gameRef.current;
    };

    const createNewGame = () => {
        gameRef.current = getNewGameInstance();
        updateGameState();
    };

    const createNewGameAndPlayFirstMove = (cellPosition: CellPosition) => {
        const game = getNewGameInstance();
        gameRef.current = game;
        playNextMove(game.getCurrentPlayer(), cellPosition);
    };

    const playNextMove = (player: Player, cellPosition: CellPosition) => {
        const game = getGame();
        if (
            game &&
            !game.isGameComplete() &&
            game.board.getCell(cellPosition).isEmpty() &&
            player === game.getCurrentPlayer()
        ) {
            game.makeMoveByPlayer(player, cellPosition);

            // Update game state on successful move
            updateGameState();
        }
    };

    const reset = () => {
        gameRef.current = null;
        updateGameState();
    };

    useEffect(() => {
        const makeMoveByAutomatedPlayer = async () => {
            const game = getGame();
            if (
                game &&
                !game.isGameComplete() &&
                game.getCurrentPlayer() instanceof AutomatedPlayer
            ) {
                const player = game.getCurrentPlayer() as AutomatedPlayer;
                const cellPosition = await player.selectCellPositionToMakeMove(game);
                playNextMove(player, cellPosition);
            }
        };
        setTimeout(makeMoveByAutomatedPlayer, 1000);
    }, [gameState]);

    return (
        <GameplayContext.Provider
            value={{
                gameState,
                createNewGame,
                createNewGameAndPlayFirstMove,
                getGame,
                playNextMove,
                reset,
            }}
        >
            {children}
        </GameplayContext.Provider>
    );
}
