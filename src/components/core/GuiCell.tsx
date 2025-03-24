import Cell from "../../core/Cell";
import { CellEntry } from "../../core/CellEntry";
import CellEntryAssociation from "../../core/CellEntryAssociation";
import { TurnSequence } from "../../core/TurnSequence";
import GuiGame from "./GuiGame";

export default class GuiCell extends Cell {
    public onClick(game: GuiGame) {
        game.getCellClickListenerFunctions().forEach((playerCallback) => playerCallback(this));
    }

    public static getSymbolOnHover(game: GuiGame, cell: Cell): CellEntry {
        if (!cell.isEmpty()) {
            return CellEntry.Empty;
        }
        if (game) {
            if (game.isGameComplete()) {
                return CellEntry.Empty;
            }
            return game.cellEntryAssociation.getCellEntryOfPlayer(game.getCurrentPlayer());
        }
        return CellEntryAssociation.getCellEntryOfTurnSequence(TurnSequence.First);
    }
}
