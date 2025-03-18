import Board from "./Board";
import Cell, { CellPosition } from "./Cell";
import { CellEntry } from "./CellEntry";
import { NoCellAvailableForMove } from "./Errors";
import Game from "./Game";
import Player from "./Player";

export default class AutomatedPlayer extends Player {
    public async selectCellPositionToMakeMove(game: Game): Promise<CellPosition> {
        await AutomatedPlayer.waitTime(1000);
        const boardCopy = game.board.copy();
        const emptyCells = boardCopy.getAllEmptyCells();

        const ownCellEntry = this.getCellEntry(game);
        const otherCellEntry =
            ownCellEntry === CellEntry.X ? CellEntry.O : CellEntry.X;

        // Check for possible win of self and then of the other player
        for (const cellEntry of [ownCellEntry, otherCellEntry]) {
            for (const cell of emptyCells) {
                if (AutomatedPlayer.canBeAWinningMove(boardCopy, cell, cellEntry)) {
                    return Promise.resolve(cell.getCellPosition());
                }
                // await AutomatedPlayer.waitTime(600);
            }
        }

        // Pick any random empty cell
        const randomCell = AutomatedPlayer.pickAnyRandomCell(emptyCells);
        if (randomCell) {
            return Promise.resolve(randomCell.getCellPosition());
        }

        throw new NoCellAvailableForMove();
    }

    private static pickAnyRandomCell(cells: Array<Cell>): Cell | null {
        // console.log("Picked random cell");
        const len = cells.length;
        if (!len) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * len);
        return cells[randomIndex];
    }

    private static canBeAWinningMove(
        boardCopy: Board,
        cell: Cell,
        newCellEntry: CellEntry
    ): boolean {
        const oldCellEntry = cell.getCellEntry();
        cell.setCellEntry(newCellEntry);
        // console.log("Board copy:");
        // boardCopy.printBoard();
        const winningCells = Game.checkGameCompleted(boardCopy);
        cell.setCellEntry(oldCellEntry);
        return Boolean(winningCells);
    }

    private static waitTime(millis: number): Promise<number> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(millis), millis);
        });
    }
}