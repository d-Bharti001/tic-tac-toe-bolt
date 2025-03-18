import { CellEntry } from "./CellEntry";
import { EmptyCellEntryError, InvalidCellAssociationError } from "./Errors";
import Player from "./Player";
import { TurnSequence } from "./TurnSequence";

export default class CellEntryAssociation {
    private readonly cellEntryAssociation: Map<CellEntry, Player | null>;

    constructor(playerA: Player, playerB: Player) {
        CellEntryAssociation.checkDifferentAssociatedCellEntries(playerA, playerB);
        this.cellEntryAssociation = new Map([
            [CellEntry.Empty, null],
            [playerA.associatedCellEntry, playerA],
            [playerB.associatedCellEntry, playerB]
        ]);
    }

    public static getCellEntryTurnSequence(cellEntry: CellEntry): TurnSequence {
        switch (cellEntry) {
            case CellEntry.X: return TurnSequence.First;
            case CellEntry.O: return TurnSequence.Second;
            default: throw new EmptyCellEntryError();
        }
    }

    public static checkDifferentAssociatedCellEntries(playerA: Player, playerB: Player): true {
        if (playerA.associatedCellEntry === playerB.associatedCellEntry) {
            throw new InvalidCellAssociationError();
        }
        return true;
    }

    public getAssociatedPlayer(cellEntry: CellEntry): Player | null {
        return this.cellEntryAssociation.get(cellEntry) as Player | null;
    }
}
