import { useState } from "react";
import { useGameplay } from "../contexts/GameplayContext";
import { CellPosition } from "../core/Cell";
import { CellEntry } from "../core/CellEntry";
import CellEntryAssociation from "../core/CellEntryAssociation";
import { TurnSequence } from "../core/TurnSequence";
import AutomatedPlayer from "../core/AutomatedPlayer";

export interface CellProps {
    cellPosition: CellPosition;
}

enum CellBackground {
    NORMAL = "NORMAL",
    GLOW = "GLOW"
}

const CELL_BG = "#263238"; // Dark background for cells
const WIN_GLOW = "rgba(230, 214, 173, 0.5)"; // Light bluish-white glow
const X_COLOR = "#FF5722"; // Reddish-orange for X
const O_COLOR = "#2196F3"; // Blue for O

export default function GuiCell({ cellPosition }: CellProps) {
    const { createNewGameAndPlayFirstMove, getGame, playNextMove } = useGameplay();

    const [hovering, setHovering] = useState<boolean>(false);

    const getBackground = (): CellBackground => {
        const game = getGame();
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

    const getCellEntryFromGame = (): CellEntry => {
        const game = getGame();
        if (game) {
            return game.board.getCell(cellPosition).getCellEntry();
        }
        return CellEntry.Empty;
    };

    const getVisibilityFromGame = (): number => {
        const game = getGame();
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

    const getCellEntry = (): CellEntry => {
        if (!hovering)
            return getCellEntryFromGame();

        // Logic for hover
        const game = getGame();
        if (game) {
            if (
                game.isGameComplete() ||
                !game.board.getCell(cellPosition).isEmpty() ||
                game.getCurrentPlayer() instanceof AutomatedPlayer
            ) {
                return getCellEntryFromGame();
            }
            return game.cellEntryAssociation.getCellEntryOfPlayer(game.getCurrentPlayer());
        }
        return CellEntryAssociation.getCellEntryOfTurnSequence(TurnSequence.First);
    };

    const getVisibility = (): number => {
        if (!hovering)
            return getVisibilityFromGame();

        // Logic for hover
        const game = getGame();
        if (game) {
            if (
                game.isGameComplete() ||
                !game.board.getCell(cellPosition).isEmpty() ||
                game.getCurrentPlayer() instanceof AutomatedPlayer
            ) {
                return getVisibilityFromGame();
            }
        }
        return 0.4;
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const game = getGame();
        if (game) {
            playNextMove(game.getCurrentPlayer(), cellPosition);
        } else {
            createNewGameAndPlayFirstMove(cellPosition);
        }
    };

    return (
        <div
            className="cell"
            role="button"
            onClick={handleClick}
            onMouseEnter={(e) => {
                e.preventDefault();
                setHovering(true);
            }}
            onMouseLeave={(e) => {
                e.preventDefault();
                setHovering(false);
            }}
            style={{
                width: "100%",
                height: "100%",
                background: getBackground() === CellBackground.GLOW ? `radial-gradient(circle, ${WIN_GLOW} 5%, ${CELL_BG} 70%)` : CELL_BG,
                transition: "background 0.3s ease-in-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 50 50"
                style={{ opacity: getVisibility(), transition: "opacity 0.1s ease-in-out" }}
            >
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(16, 22, 25, 0.5)" />
                    </filter>
                </defs>

                <g transform="translate(25, 25) scale(0.5) translate(-25, -25)">
                    {
                        getCellEntry() === CellEntry.X &&
                        <>
                            <line
                                x1="5" y1="5" x2="45" y2="45"
                                stroke={X_COLOR} strokeWidth="5" strokeLinecap="round"
                                filter="url(#shadow)"
                            />
                            <line
                                x1="45" y1="5" x2="5" y2="45"
                                stroke={X_COLOR} strokeWidth="5" strokeLinecap="round"
                                filter="url(#shadow)"
                            />
                        </>
                    }
                    {
                        getCellEntry() === CellEntry.O &&
                        <>
                            <circle
                                cx="25" cy="25" r="20"
                                stroke={O_COLOR} strokeWidth="5" fill="none"
                                filter="url(#shadow)"
                            />
                        </>
                    }
                </g>
            </svg>
        </div>
    );
}
