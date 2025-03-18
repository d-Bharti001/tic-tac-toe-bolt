import { CellEntry, CellEntryUpdate } from "./CellEntry";
import { InvalidMoveError } from "./Errors";
import Game from "./Game";
import Move from "./Move";
import Player from "./Player";

export default class MovesController {
    private moves: Array<Move>;

    constructor() {
        this.moves = new Array();
    }

    public getMovesCount(): number {
        return this.moves.length;
    }

    public getNextMoveSequenceNumber(): number {
        return this.getMovesCount();
    }

    public makeMoveByPlayer(game: Game, player: Player, row: number, col: number): Move {
        if (game.isGameComplete()) {
            throw new InvalidMoveError();
        }

        if (player !== game.getCurrentPlayer()) {
            throw new InvalidMoveError();
        }

        const cell = game.board.getCell(row, col);

        // Check the cell's entry before reverting an old move leading to Empty entry
        // and actually making a move on that "Empty" cell valid, which shouldn't happen.
        if (!cell.isEmpty()) {
            throw new InvalidMoveError();
        }

        // Revert old move before applying the new move
        // to prevent an invalid state of the game (i.e. 4 nos. of similar cell entires)
        // for an instantaneous period of time.
        // If the new entry is going to be X, then the latest 3rd `X` move should be
        // reverted first.
        // moves: [O, X, O, X, O, X, O] new move: X
        //            ^ revert this
        this.revertOldMove(player.getCellEntry(game));

        const move = Move.createAndApplyMove(
            this.getNextMoveSequenceNumber(),
            player,
            cell,
            game.cellEntryAssociation,
        );
        this.appendMove(move);

        game.updateGameSequence();

        return move;
    }

    private appendMove(move: Move) {
        this.moves.push(move);
    }

    private revertOldMove(newCellEntry: CellEntry): Move | null {
        const moveToBeReverted = this.getMoveToBeReverted(newCellEntry);
        if (moveToBeReverted instanceof Move) {
            moveToBeReverted.undoThisMove();
        }
        return moveToBeReverted;
    }

    public getMoveToBeReverted(newCellEntry: CellEntry): Move | null {
        const maxAllowedEntryCounts = this.getMaxAllowedEntryCountsForExpectedNewCellEntry(newCellEntry);
        let xEntriesCount = 0;
        let oEntriesCount = 0;
        for (let i = this.moves.length - 1; i >= 0; i--) {
            const move = this.moves[i];
            const cellUpdate = this.simulateMove(move);
            xEntriesCount += cellUpdate.X;
            oEntriesCount += cellUpdate.O;
            if (
                xEntriesCount > maxAllowedEntryCounts.X_MAX_COUNT ||
                oEntriesCount > maxAllowedEntryCounts.O_MAX_COUNT
            ) {
                return move;
            }
        }
        return null;
    }

    private getMaxAllowedEntryCountsForExpectedNewCellEntry(expectedNewCellEntry: CellEntry) {
        const result = {
            X_MAX_COUNT: 3,
            O_MAX_COUNT: 3
        };
        if (expectedNewCellEntry === CellEntry.X) {
            result.X_MAX_COUNT -= 1;
        } else if (expectedNewCellEntry === CellEntry.O) {
            result.O_MAX_COUNT -= 1;
        }
        return result;
    }

    private simulateMove(move: Move): CellEntryUpdate {
        const cellUpdate: CellEntryUpdate = {
            Empty: 0,
            X: 0,
            O: 0,
        };
        const previousEntry = move.previousCellEntry;
        const finalEntry = move.finalCellEntry;
        if (previousEntry === CellEntry.Empty && finalEntry === CellEntry.X) {
            cellUpdate.Empty -= 1;
            cellUpdate.X += 1;
        } else if (previousEntry === CellEntry.Empty && finalEntry === CellEntry.O) {
            cellUpdate.Empty -= 1;
            cellUpdate.O += 1;
        } else if (previousEntry === CellEntry.X && finalEntry === CellEntry.O) {
            cellUpdate.X -= 1;
            cellUpdate.O += 1;
        } else if (previousEntry === CellEntry.O && finalEntry === CellEntry.X) {
            cellUpdate.O -= 1;
            cellUpdate.X += 1;
        } else if (previousEntry === CellEntry.X && finalEntry === CellEntry.Empty) {
            cellUpdate.X -= 1;
            cellUpdate.Empty += 1;
        } else if (previousEntry === CellEntry.O && finalEntry === CellEntry.Empty) {
            cellUpdate.O -= 1;
            cellUpdate.Empty += 1;
        }
        return cellUpdate;
    }
}
