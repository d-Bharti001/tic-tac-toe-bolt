import Cell from "./Cell";
import { CellEntry, CellEntryUpdate } from "./CellEntry";
import Move from "./Move";
import Player from "./Player";

export default class MovesController {
    private moves: Array<Move>;
    private moveToBeReverted: number | null;    // TODO: implement this

    constructor() {
        this.moves = new Array();
        this.moveToBeReverted = null;
    }

    public getMovesCount(): number {
        return this.moves.length;
    }

    public getNextMoveSequenceNumber(): number {
        return this.getMovesCount();
    }

    public makeMove(player: Player, cell: Cell): Move {
        const move = new Move(
            this.getNextMoveSequenceNumber(),
            player,
            cell
        );
        this.appendMove(move);
        this.revertOldMove();
        return move;
    }

    private appendMove(move: Move) {
        this.moves.push(move);
    }

    private revertOldMove(): Move | null {
        const MAX_ALLOWED_ENTRY_COUNT = 3;
        let xEntriesCount = 0;
        let oEntriesCount = 0;
        for (let i = this.moves.length; i >= 0; i--) {
            const move = this.moves[i];
            const cellUpdate = this.simulateMove(move);
            xEntriesCount += cellUpdate.X;
            oEntriesCount += cellUpdate.O;
            if (
                xEntriesCount > MAX_ALLOWED_ENTRY_COUNT ||
                oEntriesCount > MAX_ALLOWED_ENTRY_COUNT
            ) {
                move.revertThisMove();
                return move;
            }
        }
        return null;
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
