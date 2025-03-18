import { CellEntry } from "./CellEntry";
import CellEntryAssociation from "./CellEntryAssociation";
import Game from "./Game";
import Move from "./Move";
import { TurnSequence } from "./TurnSequence";

export default abstract class Player {
    public readonly name: string;
    public readonly associatedCellEntry: CellEntry;

    constructor(name: string, associatedCellEntry: CellEntry) {
        this.name = name;
        this.associatedCellEntry = associatedCellEntry;
    }

    public getTurnSequence(): TurnSequence {
        return CellEntryAssociation.getCellEntryTurnSequence(this.associatedCellEntry);
    }

    public abstract makeMove(game: Game): Move;
}
