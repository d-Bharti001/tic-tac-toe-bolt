import { CellEntry } from "./CellEntry";
import { EmptyCellEntryError } from "./Errors";
import Player from "./Player";
import { TurnSequence } from "./TurnSequence";

export default class CellEntryAssociation {
    private readonly cellEntryToPlayer: Map<CellEntry, Player | null>;
    private readonly playerToCellEntry: Map<Player, CellEntry>;

    constructor(playerX: Player, playerO: Player) {
        this.cellEntryToPlayer = new Map([
            [CellEntry.Empty, null],
            [CellEntry.X, playerX],
            [CellEntry.O, playerO]
        ]);
        this.playerToCellEntry = new Map([
            [playerX, CellEntry.X],
            [playerO, CellEntry.O]
        ]);
    }

    public static getTurnSequenceOfCellEntry(cellEntry: CellEntry): TurnSequence {
        switch (cellEntry) {
            case CellEntry.X: return TurnSequence.First;
            case CellEntry.O: return TurnSequence.Second;
            default: throw new EmptyCellEntryError();
        }
    }

    public static getCellEntryOfTurnSequence(turn: TurnSequence): CellEntry {
        switch (turn) {
            case TurnSequence.First: return CellEntry.X;
            case TurnSequence.Second: return CellEntry.O;
        }
    }

    public getPlayerOfCellEntry(cellEntry: CellEntry): Player | null {
        return this.cellEntryToPlayer.get(cellEntry) as Player | null;
    }

    public getCellEntryOfPlayer(player: Player): CellEntry {
        return this.playerToCellEntry.get(player) as CellEntry;
    }

    public getTurnSequenceOfPlayer(player: Player): TurnSequence {
        return CellEntryAssociation.getTurnSequenceOfCellEntry(
            this.getCellEntryOfPlayer(player)
        );
    }

    public getPlayerOfTurnSequence(turn: TurnSequence): Player {
        return this.getPlayerOfCellEntry(
            CellEntryAssociation.getCellEntryOfTurnSequence(turn)
        ) as Player;
    }
}
