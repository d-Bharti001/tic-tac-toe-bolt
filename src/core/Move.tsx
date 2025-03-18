import Cell from "./Cell";
import { CellEntry } from "./CellEntry";
import Player from "./Player";

export default class Move {
    public readonly sequenceNumber: number;
    public readonly player: Player;
    public readonly cell: Cell;
    public readonly previousCellEntry: CellEntry;
    public readonly finalCellEntry: CellEntry;
    private reverted: boolean;

    constructor(
        sequenceNumber: number,
        player: Player,
        cell: Cell,
    ) {
        this.sequenceNumber = sequenceNumber;
        this.player = player;
        this.cell = cell;
        this.previousCellEntry = cell.getCellEntry();
        this.finalCellEntry = player.associatedCellEntry;
        this.reverted = false;
        this.applyThisMove();
    }

    public applyThisMove() {
        this.cell.applyMoveOnCell(this);
        this.reverted = false;
    }

    public revertThisMove() {
        this.cell.revertMoveOnCell(this);
        this.reverted = true;
    }

    public isReverted() {
        return this.reverted;
    }
}
