import Cell from "./Cell";
import { InvalidCellAccessError } from "./Errors";
import Game from "./Game";

export default class Board {
    public static readonly ROWS = 3;
    public static readonly COLUMNS = 3;
    public readonly ROWS = (this.constructor as typeof Board).ROWS;
    public readonly COLUMNS = (this.constructor as typeof Board).COLUMNS;
    private readonly cells: Array<Array<Cell>>;

    constructor(cells: Array<Array<Cell>>) {
        if (cells.length !== this.ROWS) {
            throw new InvalidCellAccessError();
        }
        for (const cellsRow of cells) {
            if (cellsRow.length !== this.COLUMNS) {
                throw new InvalidCellAccessError();
            }
        }
        this.cells = cells;
    }

    protected static createWithCells(
        cellCreator: (row: number, col: number) => Cell
    ): Board {
        const cells = new Array();
        for (let i = 0; i < this.ROWS; i++) {
            const cellsRow = new Array();
            for (let j = 0; j < this.COLUMNS; j++) {
                cellsRow.push(cellCreator(i, j));
            }
            cells.push(cellsRow);
        }
        return new this(cells);
    }

    public static create(): Board {
        return this.createWithCells(Cell.create.bind(Cell));
    }

    public copy(): Board {
        return (this.constructor as typeof Board).createWithCells(
            (i: number, j: number) => this.getCell(i, j).copy()
        );
    }

    public getCell(row: number, col: number): Cell {
        if (row < 0 || row >= this.ROWS ||
            col < 0 || col >= this.COLUMNS
        ) {
            throw new InvalidCellAccessError();
        }
        return this.cells[row][col];
    }

    public getAllEmptyCells(): Array<Cell> {
        let cells: Array<Cell> = [];
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLUMNS; j++) {
                const cell = this.getCell(i, j);
                if (cell.isEmpty()) {
                    cells.push(cell);
                }
            }
        }
        return cells;
    }

    public printBoard(_game?: Game) {
        for (const cellsRow of this.cells) {
            const printRow = [];
            for (const cell of cellsRow) {
                printRow.push(
                    _game
                    ? cell.getPrintableSymbolWithGameState(_game)
                    : cell.getPrintableSymbol()
                );
            }
            console.log(printRow.join(" "));
        }
    }
}
