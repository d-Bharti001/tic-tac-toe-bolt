import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TurnSequence } from "../core/TurnSequence";
import Player from "../core/Player";
import Cell, { CellPosition } from "../core/Cell";
import Game from "../core/Game";
import ManualPlayer from "../core/ManualPlayer";
import AutomatedPlayer from "../core/AutomatedPlayer";

export interface MutableGameState {
    currentTurnSequence: TurnSequence;
    totalMoves: number;
    completed: boolean;
    winner: Player | null;
    dimmedCell: Cell | null;
    winningCells: Cell[] | null;
}

export interface GameplayContextInterface {
    game: Game | null;
    gameState: MutableGameState | null;
    createNewGame: () => void;
    createNewGameAndPlayFirstMove: (cellPosition: CellPosition) => void;
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
        const game = gameRef.current;
        if (game) {
            const latestState: MutableGameState = {
                currentTurnSequence: game.getCurrentTurnSequence(),
                totalMoves: game.getTotalMovesCount(),
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
        const game = gameRef.current;
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
        const selectCellByAutomatedPlayer = (game: Game, player: AutomatedPlayer): Promise<CellPosition> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    return player.selectCellPositionToMakeMove(game).then(resolve).catch(reject);
                }, 1000);   // Wait for one second
            });
        };

        const game = gameRef.current;
        if (
            game &&
            !game.isGameComplete() &&
            game.getCurrentPlayer() instanceof AutomatedPlayer
        ) {
            const player = game.getCurrentPlayer();
            const totalMovesPreviously = game.getTotalMovesCount();
            selectCellByAutomatedPlayer(game, player).then(cellPosition => {
                const latestGame = gameRef.current;
                if (latestGame) {
                    const latestMovesCount = latestGame.getTotalMovesCount();
                    if (
                        latestGame === game &&
                        latestMovesCount === totalMovesPreviously
                    ) {
                        playNextMove(player, cellPosition);
                    }
                }
            }
            ).catch(_err => { });
        }
    }, [gameState]);

    return (
        <GameplayContext.Provider
            value={{
                game: gameRef.current,
                gameState,
                createNewGame,
                createNewGameAndPlayFirstMove,
                playNextMove,
                reset,
            }}
        >
            {children}
        </GameplayContext.Provider>
    );
}
