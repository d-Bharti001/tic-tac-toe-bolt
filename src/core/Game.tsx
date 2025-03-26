import Board from "./Board";
import Cell, { CellPosition } from "./Cell";
import { CellEntry } from "./CellEntry";
import CellEntryAssociation from "./CellEntryAssociation";
import { GameStatus } from "./GameStatus";
import Move from "./Move";
import MovesController from "./MovesController";
import Player from "./Player";
import { TurnSequence } from "./TurnSequence";

export default class Game {
    public readonly board: Board;
    public readonly playerA: Player;
    public readonly playerB: Player;
    private currentTurnSequence: TurnSequence;
    public readonly cellEntryAssociation: CellEntryAssociation;
    private readonly movesController: MovesController;
    private gameStatus: GameStatus;
    private winner: Player | null;
    private cellToBeReset: Cell | null;
    private winningCells: Array<Cell> | null;

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
        this.gameStatus = GameStatus.Incomplete;
        this.winner = null;
        this.cellToBeReset = null;
        this.winningCells = null;
    }

    public static create(playerA: Player, playerB: Player): Game {
        return new this(
            Board.create(),
            playerA,
            playerB
        );
    }

    public getCurrentPlayer(): Player {
        return this.cellEntryAssociation.getPlayerOfTurnSequence(this.getCurrentTurnSequence());
    }

    public getNextPlayer(): Player {
        return this.cellEntryAssociation.getPlayerOfTurnSequence(this.getNextTurnSequence());
    }

    public makeMoveByPlayer(player: Player, cellPosition: CellPosition): Move {
        const move = this.movesController.makeMoveByPlayer(this, player, cellPosition);
        this.updateGameSequence();
        return move;
    }

    public isGameComplete(): boolean {
        return this.gameStatus === GameStatus.Completed;
    }

    public whoWonTheGame(): Player | null {
        return this.winner;
    }

    public getWinningCells(): Array<Cell> | null {
        return this.winningCells ?? null;
    }

    public getCurrentTurnSequence(): TurnSequence {
        return this.currentTurnSequence;
    }

    public getNextTurnSequence(): TurnSequence {
        if (this.getCurrentTurnSequence() === TurnSequence.First) {
            return TurnSequence.Second;
        }
        return TurnSequence.First;
    }

    private setNextTurnSequence(): TurnSequence {
        return this.currentTurnSequence = this.getNextTurnSequence();
    }

    public getCellToBeReset(): Cell | null {
        return this.cellToBeReset;
    }

    public getCellToBeResetFromExpectedNewCellEntry(cellEntry: CellEntry): Cell | null {
        return this.movesController.getMoveToBeReverted(cellEntry)?.cell as Cell ?? null;
    }

    public setCellToBeReset(): Cell | null {
        this.cellToBeReset = this.getCellToBeResetFromExpectedNewCellEntry(
            this.cellEntryAssociation.getCellEntryOfPlayer(this.getNextPlayer())
        );
        return this.cellToBeReset;
    }

    private updateGameSequence() {
        const winningCells = Game.checkGameCompleted(this.board);
        if (winningCells) {
            this.cellToBeReset = null;
            this.winner =
                winningCells[0].getAssociatedPlayer(this) as Player;
            this.winningCells = winningCells;
            this.gameStatus = GameStatus.Completed;
        } else {
            this.setCellToBeReset();
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
            const firstCell = board.getCell({ row: i, col: 0 });
            if (firstCell.isEmpty()) {
                continue;
            }
            winningCells = [firstCell];
            let won = true;
            for (let j = 1; j < board.COLUMNS; j++) {
                const cell = board.getCell({ row: i, col: j });
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
            const firstCell = board.getCell({ row: 0, col: j });
            if (firstCell.isEmpty()) {
                continue;
            }
            winningCells = [firstCell];
            let won = true;
            for (let i = 1; i < board.ROWS; i++) {
                const cell = board.getCell({ row: i, col: j });
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
        let firstCell = board.getCell({ row: 0, col: 0 });
        if (!firstCell.isEmpty()) {
            winningCells = [firstCell];
            let won = true;
            for (let i = 1; i < board.ROWS; i++) {
                let j = i;
                if (j < board.COLUMNS) {
                    const cell = board.getCell({ row: i, col: j });
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
        firstCell = board.getCell({ row: 0, col: board.COLUMNS - 1 });
        if (!firstCell.isEmpty()) {
            winningCells = [firstCell];
            let won = true;
            for (let i = 1; i < board.ROWS; i++) {
                let j = board.COLUMNS - 1 - i;
                if (j >= 0) {
                    const cell = board.getCell({ row: i, col: j });
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
