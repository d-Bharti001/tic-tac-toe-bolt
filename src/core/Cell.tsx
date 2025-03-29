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

    constructor(cellPositon: CellPosition, entry: CellEntry) {
        this.cellPosition = cellPositon;
        this.cellEntry = entry;
    }

    protected static createWithEntry(cellPosition: CellPosition, entry: CellEntry): Cell {
        return new this(cellPosition, entry);
    }

    public static create(cellPosition: CellPosition): Cell {
        return this.createWithEntry(cellPosition, CellEntry.Empty);
    }

    public copy(): Cell {
        const cellPosition = this.getCellPosition();
        const entry = this.getCellEntry();
        return (this.constructor as typeof Cell).createWithEntry(cellPosition, entry);
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
