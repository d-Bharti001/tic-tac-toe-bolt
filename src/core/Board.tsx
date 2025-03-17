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

    public getCell(row: number, col: number): Cell {
        if (row < 0 || row >= this.ROWS ||
            col < 0 || col >= this.COLUMNS
        ) {
            throw new InvalidCellAccessError();
        }
        return this.cells[row][col];
    }

    public printBoard() {
        for (const row of this.cells) {
            for (const cell of row) {
                const position = cell.getCellPosition();
                console.log(position);
            }
        }
    }
}
