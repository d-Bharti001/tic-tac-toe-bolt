import Board from "../../core/Board";
import GuiCell from "./GuiCell";

export default class GuiBoard extends Board {
    public static create(): GuiBoard {
        return this.createWithCells(GuiCell.create);
    }
}
