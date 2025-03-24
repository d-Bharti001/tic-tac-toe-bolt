import Cell, { CellPosition } from "../../core/Cell";
import ManualPlayer from "../../core/ManualPlayer";
import GuiGame from "./GuiGame";

export default class GuiManualPlayer extends ManualPlayer {
    private cellClickResolver: ((cell: Cell) => void) | null = null;

    public onCellClick(cell: Cell) {
        if (cell.isEmpty() && this.cellClickResolver) {
            const currentResolver = this.cellClickResolver;
            this.cellClickResolver = null;
            currentResolver(cell);
        }
    }

    public async selectCellPositionToMakeMove(_game: GuiGame): Promise<CellPosition> {
        const selectedCell = await new Promise<Cell>((resolve) => {
            this.cellClickResolver = resolve;
        });
        return selectedCell.getCellPosition();
    }

    public startListeningToCellClick(game: GuiGame) {
        game.registerCellClickListener(this.onCellClick);
    }
}
