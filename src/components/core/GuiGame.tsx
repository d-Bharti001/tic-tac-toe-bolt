import Cell from "../../core/Cell";
import Game from "../../core/Game";
import Player from "../../core/Player";
import GuiBoard from "./GuiBoard";
import GuiManualPlayer from "./GuiManualPlayer";

export default class GuiGame extends Game {
    private cellClickListeners: Set<(cell: Cell) => void> = new Set();

    public static create(playerA: Player, playerB: Player): GuiGame {
        const game = new this(GuiBoard.create(), playerA, playerB);
        if (playerA instanceof GuiManualPlayer) {
            game.registerCellClickListener(playerA.onCellClick.bind(playerA));
        }
        if (playerB instanceof GuiManualPlayer) {
            game.registerCellClickListener(playerB.onCellClick.bind(playerB));
        }
        return game;
    }

    public getDimmedCell(): Cell | null {
        return this.getCellToBeReset();
    }

    public registerCellClickListener(callback: (cell: Cell) => void) {
        this.cellClickListeners.add(callback);
    }

    public getCellClickListenerFunctions(): Array<(cell: Cell) => void> {
        return Array.from(this.cellClickListeners);
    }
}
