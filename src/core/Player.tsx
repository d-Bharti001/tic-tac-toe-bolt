import Board from "./Board";
import Cell from "./Cell";
import { CellEntry } from "./CellEntry";
import Game from "./Game";
import Move from "./Move";
import { TurnSequence } from "./TurnSequence";

export default abstract class Player {
    public readonly name: string;
    public readonly turnSequence: TurnSequence;
    public readonly associatedCellEntry: CellEntry;

    constructor(name: string, associatedCellEntry: CellEntry, turnSequence: TurnSequence,) {
        this.name = name;
        this.associatedCellEntry = associatedCellEntry;
        this.turnSequence = turnSequence;
    }

    public abstract makeMove(game: Game): Move;
}
