import Board from "./Board";
import Cell from "./Cell";
import CellEntryAssociation from "./CellEntryAssociation";
import { GameState } from "./GameState";
import MovesController from "./MovesController";
import Player from "./Player";
import { TurnSequence } from "./TurnSequence";

export default class Game {
    public readonly board: Board;
    public readonly playerA: Player;
    public readonly playerB: Player;
    private currentTurnSequence: TurnSequence;
    public readonly cellEntryAssociation: CellEntryAssociation;
    public readonly movesController: MovesController;
    private gameState: GameState;
    private winner: Player | null;
    private winningCells: Array<Cell>;

    constructor(
        board: Board,
        playerA: Player,
        playerB: Player
    ) {
        this.board = board;
        this.playerA = playerA;
        this.playerB = playerB;
        this.currentTurnSequence = TurnSequence.First;

        // playerA: X (1st), playerB: O (2nd)
        this.cellEntryAssociation = new CellEntryAssociation(this.playerA, this.playerB);
        this.movesController = new MovesController();
        this.gameState = GameState.Incomplete;
        this.winner = null;
        this.winningCells = new Array();
    }

    protected static createNewGame( board: Board, playerA: Player, playerB: Player): Game {
        return new this(board, playerA, playerB);
    }

    public static create(playerA: Player, playerB: Player): Game {
        return this.createNewGame(
            Board.create(),
            playerA,
            playerB
        );
    }

    public getCurrentPlayer(): Player {
        return this.cellEntryAssociation.getPlayerOfTurnSequence(this.currentTurnSequence);
    }

    public isGameComplete(): boolean {
        return this.gameState === GameState.Completed;
    }

    public whoWonTheGame(): Player | null {
        return this.winner;
    }

    public getWinningCells(): Array<Cell> | null {
        return this.winningCells ?? null;
    }

    public setNextTurnSequence(): TurnSequence {
        if (this.currentTurnSequence === TurnSequence.First) {
            this.currentTurnSequence = TurnSequence.Second;
        } else {
            this.currentTurnSequence = TurnSequence.First;
        }
        return this.currentTurnSequence;
    }

    public updateGameSequence() {
        const winningCells = Game.checkGameCompleted(this.board);
        if (winningCells) {
            this.winner =
                winningCells[0].getAssociatedPlayer(this) as Player;
            this.winningCells = winningCells;
            this.gameState = GameState.Completed;
        } else {
            this.setNextTurnSequence();
        }
    }

    public static checkGameCompleted(board: Board) {
        let winningCells: Array<Cell> | null;

        const toCheck = [
            Game.checkAnyRowComplete,
            Game.checkAnyColumnComplete,
            Game.checkAnyDiagonalComplete
        ];

        for (const toCheckElem of toCheck) {
            winningCells = toCheckElem(board);
            if (winningCells) {
                return winningCells;
            }
        }
        return null;
    }

    public static checkAnyRowComplete(board: Board) {
        let winningCells: Array<Cell>;
        for (let i = 0; i < board.ROWS; i++) {
            const firstCell = board.getCell(i, 0);
            if (firstCell.isEmpty()) {
                continue;
            }
            winningCells = [firstCell];
            let won = true;
            for (let j = 1; j < board.COLUMNS; j++) {
                const cell = board.getCell(i, j);
                if (cell.getCellEntry() === firstCell.getCellEntry()) {
                    winningCells.push(cell);
                } else {
                    won = false;
                    break;
                }
            }
            if (won) {
                return winningCells;
            }
        }
        return null;
    }

    public static checkAnyColumnComplete(board: Board) {
        let winningCells: Array<Cell>;
        for (let j = 0; j < board.COLUMNS; j++) {
            const firstCell = board.getCell(0, j);
            if (firstCell.isEmpty()) {
                continue;
            }
            winningCells = [firstCell];
            let won = true;
            for (let i = 1; i < board.ROWS; i++) {
                const cell = board.getCell(i, j);
                if (cell.getCellEntry() === firstCell.getCellEntry()) {
                    winningCells.push(cell);
                } else {
                    won = false;
                    break;
                }
            }
            if (won) {
                return winningCells;
            }
        }
        return null;
    }

    public static checkAnyDiagonalComplete(board: Board) {
        let winningCells: Array<Cell>;

        // 1st Diagonal
        let firstCell = board.getCell(0, 0);
        if (!firstCell.isEmpty()) {
            winningCells = [firstCell];
            let won = true;
            for (let i = 1; i < board.ROWS; i++) {
                let j = i;
                if (j < board.COLUMNS) {
                    const cell = board.getCell(i, j);
                    if (cell.getCellEntry() === firstCell.getCellEntry()) {
                        winningCells.push(cell);
                    } else {
                        won = false;
                        break;
                    }
                }
            }
            if (won) {
                return winningCells;
            }
        }

        // 2nd diagonal
        firstCell = board.getCell(0, board.COLUMNS - 1);
        if (!firstCell.isEmpty()) {
            winningCells = [firstCell];
            let won = true;
            for (let i = 1; i < board.ROWS; i++) {
                let j = board.COLUMNS - 1 - i;
                if (j >= 0) {
                    const cell = board.getCell(i, j);
                    if (cell.getCellEntry() === firstCell.getCellEntry()) {
                        winningCells.push(cell);
                    } else {
                        won = false;
                        break;
                    }
                }
            }
            if (won) {
                return winningCells;
            }
        }
        return null;
    }
}
