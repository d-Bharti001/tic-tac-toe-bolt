import { CellEntry } from "./CellEntry";
import CellEntryAssociation from "./CellEntryAssociation";
import Move from "./Move";
import Player from "./Player";

export default class Cell {
    private row: number;
    private col: number;
    private cellEntry: CellEntry;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.cellEntry = CellEntry.Empty;
    }

    public getCellPosition() {
        return { row: this.row, col: this.col };
    }

    public getCellEntry(): CellEntry {
        return this.cellEntry;
    }

    public getAssociatedPlayer(cellEntryAssociation: CellEntryAssociation): Player | null {
        return cellEntryAssociation.getAssociatedPlayer(this.cellEntry);
    }

    public applyMoveOnCell(move: Move) {
        this.cellEntry = move.finalCellEntry;
    }

    public revertMoveOnCell(move: Move) {
        this.cellEntry = move.previousCellEntry;
    }
}
