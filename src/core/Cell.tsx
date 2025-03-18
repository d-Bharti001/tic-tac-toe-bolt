import { CellEntry } from "./CellEntry";
import Game from "./Game";
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

    public copy(): Cell {
        return Object.create(this);
    }

    public getCellPosition() {
        return this.cellPosition;
    }

    public getCellEntry(): CellEntry {
        return this.cellEntry;
    }

    public setCellEntry(newEntry: CellEntry) {
        this.cellEntry = newEntry;
    }

    public isEmpty(): boolean {
        return this.cellEntry === CellEntry.Empty;
    }

    public getAssociatedPlayer(game: Game): Player | null {
        return game.cellEntryAssociation.getPlayerOfCellEntry(this.cellEntry);
    }

    public getPrintableSymbol(): string {
        switch (this.cellEntry) {
            case CellEntry.X: return "X";
            case CellEntry.O: return "O";
            default: return "_";
        }
    }
}
