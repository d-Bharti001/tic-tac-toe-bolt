import Board from "./Board";
import Game from "./Game";
import Move from "./Move";
import Player from "./Player";

export default abstract class ManualPlayer extends Player {
    public makeMove(game: Game): Move {
        const cell = this.selectCellToMakeMove(board);
        
    }


    public selectCellToMakeMove(game: Game): Cell {
        const board = game.getBoard();
        
    }
}
