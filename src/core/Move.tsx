import Cell from "./Cell";
import { CellEntry } from "./CellEntry";
import CellEntryAssociation from "./CellEntryAssociation";
import Player from "./Player";

export default class Move {
    public readonly sequenceNumber: number;
    public readonly player: Player;
    public readonly cell: Cell;
    public readonly previousCellEntry: CellEntry;
    public readonly finalCellEntry: CellEntry;
    private applied: boolean;

    constructor(
        sequenceNumber: number,
        player: Player,
        cell: Cell,
        cellEntryAssociation: CellEntryAssociation
    ) {
        this.sequenceNumber = sequenceNumber;
        this.player = player;
        this.cell = cell;
        this.previousCellEntry = cell.getCellEntry();
        this.finalCellEntry = cellEntryAssociation.getCellEntryOfPlayer(player);
        this.applied = false;
    }

    public static createAndApplyMove(
        sequenceNumber: number,
        player: Player,
        cell: Cell,
        cellEntryAssociation: CellEntryAssociation
    ): Move {
        const move = new Move(sequenceNumber, player, cell, cellEntryAssociation);
        move.applyThisMove();
        return move;
    }

    public applyThisMove() {
        this.cell.applyMoveOnCell(this);
        this.applied = true;
    }

    public undoThisMove() {
        this.cell.revertMoveOnCell(this);
        this.applied = false;
    }

    public isApplied() {
        return this.applied;
    }
}
