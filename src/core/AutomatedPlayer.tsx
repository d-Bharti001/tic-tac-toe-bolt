import Cell, { CellPosition } from "./Cell";
import { NoCellAvailableForMove } from "./Errors";
import Game from "./Game";
import Move from "./Move";
import Player from "./Player";

export default class AutomatedPlayer extends Player {
    public selectCellPositionToMakeMove(game: Game): CellPosition {
        const emptyCells = game.board.getAllEmptyCells();
        for (const cell of emptyCells) {
            const cellPosition = cell.getCellPosition();
            if (this.canMakeAWinningMove(game, cellPosition)) {
                return cellPosition;
            }
        }
        const randomCell = this.pickAnyRandomCell(emptyCells);
        if (randomCell) {
            return randomCell.getCellPosition();
        }
        throw new NoCellAvailableForMove();
    }

    private pickAnyRandomCell(cells: Array<Cell>): Cell | null {
        const len = cells.length;
        if (!len) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * len);
        return cells[randomIndex];
    }

    private canMakeAWinningMove(game: Game, cellPosition: CellPosition): boolean {
        const boardCopy = game.board.copy();
        Move.createAndApplyMove(
            0,
            this,
            boardCopy.getCell(cellPosition.row, cellPosition.col),
            game.cellEntryAssociation
        );
        const result = game.checkGameCompleted(boardCopy, game.cellEntryAssociation);
        if (result && result.winner === this) {
            return true;
        }
        return false;
    }
}