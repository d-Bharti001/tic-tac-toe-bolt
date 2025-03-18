import { CellPosition } from "./Cell";
import { CellEntry } from "./CellEntry";
import Game from "./Game";
import Move from "./Move";
import { TurnSequence } from "./TurnSequence";

export default abstract class Player {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getCellEntry(game: Game): CellEntry {
        return game.cellEntryAssociation.getCellEntryOfPlayer(this);
    }

    public getTurnSequence(game: Game): TurnSequence {
        return game.cellEntryAssociation.getTurnSequenceOfPlayer(this);
    }

    public async makeMove(game: Game): Promise<Move> {
        const { row, col } = await this.selectCellPositionToMakeMove(game);
        return game.movesController.makeMoveByPlayer(game, this, row, col);
    }

    public abstract selectCellPositionToMakeMove(game: Game): Promise<CellPosition>;
}
