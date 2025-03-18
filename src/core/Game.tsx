import AutomatedPlayer from "./AutomatedPlayer";
import Board from "./Board";
import Cell from "./Cell";
import CellEntryAssociation from "./CellEntryAssociation";
import { GameState } from "./GameState";
import ManualPlayer from "./ManualPlayer";
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

    constructor() {
        this.board = new Board();
        this.playerA = new ManualPlayer("You");
        this.playerB = new AutomatedPlayer("Computer");
        this.currentTurnSequence = TurnSequence.First;

        // playerA: X (1st), playerB: O (2nd)
        this.cellEntryAssociation = new CellEntryAssociation(this.playerA, this.playerB);
        this.movesController = new MovesController();
        this.gameState = GameState.Incomplete;
        this.winner = null;
        this.winningCells = new Array();
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
        const winningState = this.checkGameCompleted(this.board, this.cellEntryAssociation);
        if (winningState) {
            this.winner = winningState.winner;
            this.winningCells = winningState.cells;
            this.gameState = GameState.Completed;
        } else {
            this.setNextTurnSequence();
        }
    }

    public checkGameCompleted(board: Board, cellAssociation: CellEntryAssociation) {
        let winningState: {
            winner: Player,
            cells: Array<Cell>
        } | null = null;

        const toCheck = [
            this.isAnyRowComplete,
            this.isAnyColumnComplete,
            this.isAnyDiagonalComplete
        ];

        for (const toCheckElem of toCheck) {
            if (!winningState) {
                winningState = toCheckElem(board, cellAssociation);
            }
        }

        return winningState;
    }

    public isAnyRowComplete(board: Board, cellAssociation: CellEntryAssociation) {
        let winningCells: Array<Cell>;
        for (let i = 0; i < board.ROWS; i++) {
            const firstCell = board.getCell(i, 0);
            if (!firstCell.getAssociatedPlayer(cellAssociation)) {
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
                return {
                    winner: firstCell.getAssociatedPlayer(cellAssociation) as Player,
                    cells: winningCells
                };
            }
        }
        return null;
    }

    public isAnyColumnComplete(board: Board, cellAssociation: CellEntryAssociation) {
        let winningCells: Array<Cell>;
        for (let j = 0; j < board.COLUMNS; j++) {
            const firstCell = board.getCell(0, j);
            if (!firstCell.getAssociatedPlayer(cellAssociation)) {
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
                return {
                    winner: firstCell.getAssociatedPlayer(cellAssociation) as Player,
                    cells: winningCells
                };
            }
        }
        return null;
    }

    public isAnyDiagonalComplete(board: Board, cellAssociation: CellEntryAssociation) {
        let winningCells: Array<Cell>;

        // 1st Diagonal
        let firstCell = board.getCell(0, 0);
        if (firstCell.getAssociatedPlayer(cellAssociation)) {
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
                return {
                    winner: firstCell.getAssociatedPlayer(cellAssociation) as Player,
                    cells: winningCells
                }
            }
        }

        // 2nd diagonal
        firstCell = board.getCell(0, board.COLUMNS - 1);
        if (firstCell.getAssociatedPlayer(cellAssociation)) {
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
                return {
                    winner: firstCell.getAssociatedPlayer(cellAssociation) as Player,
                    cells: winningCells
                };
            }
        }
        return null;
    }
}
