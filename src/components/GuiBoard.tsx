import { useGameplay } from "../contexts/GameplayContext";
import AutomatedPlayer from "../core/AutomatedPlayer";
import { CellPosition } from "../core/Cell";
import { CellEntry } from "../core/CellEntry";
import CellEntryAssociation from "../core/CellEntryAssociation";
import { TurnSequence } from "../core/TurnSequence";
import GuiCell, { CellBackground } from "./GuiCell";

const BOARD_COLOR = "#D68C2C"; // Darker orange for the board

const cellPositions: CellPosition[] = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
];

export default function GuiBoard() {
    const { game, me, createNewGameAndPlayFirstMove, playNextMove } = useGameplay();

    const decideCellBackground = (cellPosition: CellPosition): CellBackground => {
        if (game) {
            const winningCells = game.getWinningCells();
            if (winningCells) {
                for (const cell of winningCells) {
                    if (cell.isSameCell(cellPosition)) {
                        return CellBackground.GLOW;
                    }
                }
            }
        }
        return CellBackground.NORMAL;
    };

    const decideCellEntryFromGame = (cellPosition: CellPosition): CellEntry => {
        if (game) {
            return game.board.getCell(cellPosition).getCellEntry();
        }
        return CellEntry.Empty;
    };

    const decideCellEntryVisibilityFromGame = (cellPosition: CellPosition): number => {
        if (game) {
            const dimmedCell = game.getCellToBeReset();
            if (dimmedCell && dimmedCell.isSameCell(cellPosition)) {
                return 0.6;
            }
            const cell = game.board.getCell(cellPosition);
            if (!cell.isEmpty())
                return 1;
        }
        return 0;
    };

    const decideCellEntry = (cellPosition: CellPosition, hovering: boolean): CellEntry => {
        if (!hovering)
            return decideCellEntryFromGame(cellPosition);

        // Logic for hover
        if (game) {
            if (
                game.isGameComplete() ||
                !game.board.getCell(cellPosition).isEmpty() ||
                game.getCurrentPlayer() instanceof AutomatedPlayer
            ) {
                return decideCellEntryFromGame(cellPosition);
            }
            return game.cellEntryAssociation.getCellEntryOfPlayer(game.getCurrentPlayer());
        }
        return CellEntryAssociation.getCellEntryOfTurnSequence(TurnSequence.First);
    };

    const decideCellEntryVisibility = (cellPosition: CellPosition, hovering: boolean): number => {
        if (!hovering)
            return decideCellEntryVisibilityFromGame(cellPosition);

        // Logic for hover
        if (game) {
            if (
                game.isGameComplete() ||
                !game.board.getCell(cellPosition).isEmpty() ||
                game.getCurrentPlayer() instanceof AutomatedPlayer
            ) {
                return decideCellEntryVisibilityFromGame(cellPosition);
            }
        }
        return 0.4;
    };

    const handleCellClick = (cellPosition: CellPosition) => {
        if (game) {
            if (game.getCurrentPlayer() === me) {
                playNextMove(me, cellPosition);
            }
        } else {
            createNewGameAndPlayFirstMove(cellPosition);
        }
    };

    return (
        <div
            className="board"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",  // Creates a 3x3 grid
                gap: "4%",
                background: BOARD_COLOR,
                padding: "5%",
                borderRadius: 20,
                position: "relative",
                width: "80%",  // Board takes 80% of GameCanvas
                maxWidth: "360px",  // Prevents excessive scaling
                height: "auto",  // Adjusts dynamically
                aspectRatio: "1",  // Ensures it's always square
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",  // Adds a shadow for depth
            }}
        >
            {
                cellPositions.map((cellPosition, i) =>
                    <GuiCell
                        key={i}
                        cellPosition={cellPosition}
                        decideCellBackground={decideCellBackground}
                        decideCellEntry={decideCellEntry}
                        decideCellEntryVisibility={decideCellEntryVisibility}
                        handleCellClick={handleCellClick}
                    />
                )
            }
        </div>
    );
}
