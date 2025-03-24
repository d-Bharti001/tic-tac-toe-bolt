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

    constructor(row: number, col: number, entry: CellEntry) {
        this.cellPosition = { row, col };
        this.cellEntry = entry;
    }

    protected static createWithEntry(row: number, col: number, entry: CellEntry): Cell {
        return new this(row, col, entry);
    }

    public static create(row: number, col: number): Cell {
        return this.createWithEntry(row, col, CellEntry.Empty);
    }

    public copy(): Cell {
        const { row, col } = this.getCellPosition();
        const entry = this.getCellEntry();
        return (this.constructor as typeof Cell).createWithEntry(row, col, entry);
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

    public isSameCell(otherCellPosition: CellPosition): boolean {
        const { row, col } = otherCellPosition;
        const { row: thisRow, col: thisCol } = this.getCellPosition();
        return thisRow === row && thisCol === col;
    }

    public isCellToBeReset(game: Game): boolean {
        const cellToBeReset = game.getCellToBeReset();
        if (cellToBeReset) {
            return this.isSameCell(cellToBeReset.getCellPosition());
        }
        return false;
    }

    public getPrintableSymbol(): string {
        switch (this.cellEntry) {
            case CellEntry.X: return "X";
            case CellEntry.O: return "O";
            default: return "_";
        }
    }

    public getPrintableSymbolWithGameState(game: Game): string {
        const symbol = this.getPrintableSymbol();
        if (this.isCellToBeReset(game)) {
            return symbol.toLowerCase();
        }
        return symbol;
    }
}
