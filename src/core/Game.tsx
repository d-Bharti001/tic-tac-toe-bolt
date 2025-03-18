import AutomatedPlayer from "./AutomatedPlayer";
import Board from "./Board";
import Cell from "./Cell";
import { CellEntry } from "./CellEntry";
import CellEntryAssociation from "./CellEntryAssociation";
import { GameState } from "./GameState";
import ManualPlayer from "./ManualPlayer";
import Move from "./Move";
import MovesController from "./MovesController";
import Player from "./Player";
import { TurnSequence } from "./TurnSequence";

export default class Game {
    private board: Board;
    private playerA: Player;
    private playerB: Player;
    private cellEntryAssociation: CellEntryAssociation;
    private movesController: MovesController;
    private gameState: GameState;
    private winner: Player | null;
    private winningCells: Array<Cell>;

    constructor() {
        this.board = new Board();
        this.playerA = new ManualPlayer("You", CellEntry.X);
        this.playerB = new AutomatedPlayer("Computer", CellEntry.O);
        this.cellEntryAssociation = new CellEntryAssociation(this.playerA, this.playerB);
        this.movesController = new MovesController();
        this.gameState = GameState.Incomplete;
        this.winner = null;
        this.winningCells = new Array();
    }

    public getBoard() {
        return this.board;
    }

    public getMovesController() {
        return this.movesController;
    }

    public makeMoveByPlayer(player: Player, row: number, col: number): Move {
        const cell = this.getBoard().getCell(row, col);
        const move = this.getMovesController().makeMoveByPlayer(this, player, cell);
        this.checkGameCompleted();
        return move;
    }

    public isGameComplete(): boolean {
        return this.gameState === GameState.Completed;
    }

    public whoWonTheGame(): Player | null {
        return this.winner;
    }

    public checkGameCompleted(): Player | null {
        let cells;
        let winner = null;

        // Check all rows


        // Check all columns

        // Check both diagonals

        if (winner !== null) {
            this.updateGameCompletionState(winner, cells);
        }

        return winner;
    }

    public updateGameCompletionState(player: Player, cells: Array<Cell>) {
        this.winner = player;
        this.winningCells = cells;
        this.gameState = GameState.Completed;
    }
}
