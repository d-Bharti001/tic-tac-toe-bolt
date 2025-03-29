import Board from "./Board";
import Cell, { CellPosition } from "./Cell";
import { CellEntry } from "./CellEntry";
import { NoCellAvailableForMove } from "./Errors";
import Game from "./Game";
import Player from "./Player";

export default class AutomatedPlayer extends Player {
    public async selectCellPositionToMakeMove(game: Game): Promise<CellPosition> {
        const boardCopy = game.board.copy();
        const emptyCells = boardCopy.getAllEmptyCells();

        const ownCellEntry = this.getCellEntry(game);
        const otherCellEntry =
            ownCellEntry === CellEntry.X ? CellEntry.O : CellEntry.X;

        // Check for possible win of self and then of the other player
        for (const cellEntry of [ownCellEntry, otherCellEntry]) {
            for (const cell of emptyCells) {
                if (AutomatedPlayer.canBeAWinningMove(game, boardCopy, cell, cellEntry)) {
                    return Promise.resolve(cell.getCellPosition());
                }
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
        const len = cells.length;
        if (!len) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * len);
        return cells[randomIndex];
    }

    private static canBeAWinningMove(
        game: Game,
        boardCopy: Board,
        cell: Cell,
        newCellEntry: CellEntry
    ): boolean {
        const oldCellEntry = cell.getCellEntry();
        cell.setCellEntry(newCellEntry);
        const winningCells = Game.checkGameCompleted(boardCopy);
        let isWinning = Boolean(winningCells);
        if (winningCells) {
            const resetCell =
                game.getCellToBeResetFromExpectedNewCellEntry(newCellEntry);
            if (resetCell) {
                for (const cell of winningCells) {
                    if (cell.isSameCell(resetCell.getCellPosition())) {
                        isWinning = false;
                        break;
                    }
                }
            }
        }
        cell.setCellEntry(oldCellEntry);
        return isWinning;
    }
}