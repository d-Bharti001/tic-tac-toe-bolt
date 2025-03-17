import { CellEntry } from "./CellEntry";
import Move from "./Move";
import Player from "./Player";

export default class Cell {
    private row: number;
    private col: number;
    private cellEntry: CellEntry;
    private associatedPlayer: Player | null;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.cellEntry = CellEntry.Empty;
        this.associatedPlayer = null;
    }

    public getCellPosition() {
        return { row: this.row, col: this.col };
    }

    public getCellEntry(): CellEntry {
        return this.cellEntry;
    }

    public getAssociatedPlayer(): Player | null {
        return this.associatedPlayer;
    }

    public applyMoveOnCell(move: Move) {
        this.cellEntry = move.finalCellEntry;
        this.associatedPlayer = move.player;
    }

    public revertMoveOnCell(move: Move) {
        this.cellEntry = move.previousCellEntry;
        this.associatedPlayer = move.previousAssociatedPlayer;
    }
}
