import { useEffect, useState } from "react";
import { useGameplay } from "../contexts/GameplayContext";
import Cell, { CellPosition } from "../core/Cell";
import { CellEntry } from "../core/CellEntry";
import ManualPlayer from "../core/ManualPlayer";
import { getManualPlayer } from "../utils/gameplayUtils";
import CellEntryAssociation from "../core/CellEntryAssociation";
import { TurnSequence } from "../core/TurnSequence";

export interface CellProps {
    cellPosition: CellPosition;
}

const CELL_BG = "#263238"; // Dark background for cells
const WIN_GLOW = "rgba(230, 214, 173, 0.5)"; // Light bluish-white glow
const X_COLOR = "#FF5722"; // Reddish-orange for X
const O_COLOR = "#2196F3"; // Blue for O

export default function GuiCell({ cellPosition }: CellProps) {
    const { gameState, createNewGameAndPlayFirstMove, getGame, playNextMove } = useGameplay();

    const [cellEntry, setCellEntry] = useState<CellEntry>(CellEntry.Empty);
    const [visibility, setVisibility] = useState<number>(0);
    const [background, setBackground] = useState<"NORMAL" | "GLOW">("NORMAL");

    const setForeground = (cellEntry: CellEntry, visibility: number) => {
        setCellEntry(cellEntry);
        setVisibility(visibility);
    };

    const updateCellUsingGameDetails = () => {
        const game = getGame();
        if (game) {
            const cell = getThisCell() as Cell;
            if (!cell.isEmpty()) {
                let visibility = 1;
                let cellToBeReset = game.getCellToBeReset();
                if (cellToBeReset && cell.isSameCell(cellToBeReset.getCellPosition()))
                    visibility = 0.6;
                setForeground(cell.getCellEntry(), visibility);
            } else {
                setForeground(CellEntry.Empty, 0);
            }

            const winningCells = game.getWinningCells();
            let isWinningCell = false;
            if (winningCells) {
                for (const cell of winningCells) {
                    if (cell.isSameCell(cellPosition)) {
                        isWinningCell = true;
                        break;
                    }
                }
            }
            if (isWinningCell)
                setBackground("GLOW");
            else
                setBackground("NORMAL");
        } else {
            setForeground(CellEntry.Empty, 0);
            setBackground("NORMAL");
        }
    };

    const getThisCell = (): Cell | null => {
        const game = getGame();
        if (game) {
            return game.board.getCell(cellPosition.row, cellPosition.col);
        }
        return null;
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const game = getGame();
        if (game) {
            let manualPlayer = getManualPlayer(game) as ManualPlayer;
            playNextMove(manualPlayer, cellPosition);
        } else {
            createNewGameAndPlayFirstMove(cellPosition);
        }
    };

    const updateCellOnHover = () => {
        const game = getGame();
        if (game) {
            if (game.isGameComplete()) {
                return;
            }
            const cell = getThisCell() as Cell;
            if (cell.isEmpty() && game.getCurrentPlayer() instanceof ManualPlayer) {
                setForeground(
                    game.cellEntryAssociation.getCellEntryOfPlayer(game.getCurrentPlayer()),
                    0.4
                );
            }
        } else {
            setForeground(
                CellEntryAssociation.getCellEntryOfTurnSequence(TurnSequence.First),
                0.4
            );
        }
    };

    useEffect(() => {
        updateCellUsingGameDetails();
    }, [gameState]);

    return (
        <div
            className="cell"
            role="button"
            onClick={handleClick}
            onMouseEnter={updateCellOnHover}
            onMouseLeave={updateCellUsingGameDetails}
            style={{
                width: "100%",
                height: "100%",
                background: background === "GLOW" ? `radial-gradient(circle, ${WIN_GLOW} 5%, ${CELL_BG} 70%)` : CELL_BG,
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
                style={{ opacity: visibility, transition: "opacity 0.1s ease-in-out" }}
            >
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(16, 22, 25, 0.5)" />
                    </filter>
                </defs>

                <g transform="translate(25, 25) scale(0.5) translate(-25, -25)">
                {
                    cellEntry === CellEntry.X &&
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
                    cellEntry === CellEntry.O &&
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
