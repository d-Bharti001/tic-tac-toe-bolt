import { CellEntry } from "./CellEntry";
import CellEntryAssociation from "./CellEntryAssociation";
import Move from "./Move";
import Player from "./Player";

export type CellPosition = {
    readonly row: number;
    readonly col: number;
}

export default class Cell {
    public readonly cellPosition: CellPosition;
    private cellEntry: CellEntry;

    constructor(row: number, col: number) {
        this.cellPosition = { row, col };
        this.cellEntry = CellEntry.Empty;
    }

    public getCellPosition() {
        return this.cellPosition;
    }

    public getCellEntry(): CellEntry {
        return this.cellEntry;
    }

    public isEmpty(): boolean {
        return this.cellEntry === CellEntry.Empty;
    }

    public getAssociatedPlayer(cellEntryAssociation: CellEntryAssociation): Player | null {
        return cellEntryAssociation.getPlayerOfCellEntry(this.cellEntry);
    }

    public applyMoveOnCell(move: Move) {
        this.cellEntry = move.finalCellEntry;
    }

    public revertMoveOnCell(move: Move) {
        this.cellEntry = move.previousCellEntry;
    }

    public getPrintableSymbol(): string {
        switch (this.cellEntry) {
            case CellEntry.X: return "X";
            case CellEntry.O: return "O";
            default: return "_";
        }
    }
}
