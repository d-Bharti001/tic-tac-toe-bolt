import { useState } from "react";
import { CellPosition } from "../core/Cell";
import { CellEntry } from "../core/CellEntry";

export interface CellProps {
    cellPosition: CellPosition;
    decideCellBackground: (cellPosition: CellPosition) => CellBackground;
    decideCellEntry: (cellPosition: CellPosition, hovering: boolean) => CellEntry;
    decideCellEntryVisibility: (cellPosition: CellPosition, hovering: boolean) => number;
    handleCellClick: (cellPosition: CellPosition) => void;
}

export enum CellBackground {
    NORMAL = "NORMAL",
    GLOW = "GLOW"
}

const CELL_BG = "#263238"; // Dark background for cells
const X_COLOR = "#FF5722"; // Reddish-orange for X
const O_COLOR = "#2196F3"; // Blue for O

export default function GuiCell(props: CellProps) {
    const [hovering, setHovering] = useState<boolean>(false);

    const {
        cellPosition,
        decideCellBackground,
        decideCellEntry,
        decideCellEntryVisibility,
        handleCellClick,
    } = props;

    return (
        <div
            className="cell"
            role="button"
            onClick={(e) => {
                e.preventDefault();
                handleCellClick(cellPosition)
            }}
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
                background: CELL_BG,
                transition: "background 0.3s ease-in-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                boxShadow: decideCellBackground(cellPosition) === CellBackground.NORMAL
                    ? "inset 0px 0px 10px rgba(0, 0, 0, 0.5)"
                    : "inset 0px 0px 10px rgba(255, 249, 196, 0.8)"
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 50 50"
                style={{ opacity: decideCellEntryVisibility(cellPosition, hovering), transition: "opacity 0.2s ease-in-out" }}
            >
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(16, 22, 25, 0.5)" />
                    </filter>
                </defs>

                <g transform="translate(25, 25) scale(0.5) translate(-25, -25)">
                    {
                        decideCellEntry(cellPosition, hovering) === CellEntry.X &&
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
                        decideCellEntry(cellPosition, hovering) === CellEntry.O &&
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
