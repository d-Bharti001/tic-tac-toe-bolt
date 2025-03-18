import { CellPosition } from "./Cell";
import Game from "./Game";
import Player from "./Player";

export default class ManualPlayer extends Player {
    public selectCellPositionToMakeMove(game: Game): CellPosition {
        const board = game.board;

        // TODO: Take input from user
        let row = 1;
        let col = 2;
        return { row, col };
    }
}
