import Cell from "./Cell";
import { InvalidCellAccessError } from "./Errors";

export default class Board {
    public readonly ROWS = 3;
    public readonly COLUMNS = 3;
    private readonly cells: Array<Array<Cell>>;

    constructor() {
        this.cells = new Array();
        for (let i = 0; i < this.ROWS; i++) {
            const cellsRow = new Array(this.COLUMNS).fill(null).map((_, j) =>
                new Cell(i, j)
            );
            this.cells.push(cellsRow);
        }
    }

    public copy(): Board {
        const boardCopy = new Board();
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLUMNS; j++) {
                boardCopy.cells[i][j] = this.getCell(i, j);
            }
        }
        return boardCopy;
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

    public printBoard() {
        for (const cellsRow of this.cells) {
            const printRow = [];
            for (const cell of cellsRow) {
                printRow.push(cell.getPrintableSymbol());
            }
            console.log(printRow.join(" "));
        }
    }
}
