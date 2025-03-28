import { CellEntry } from "../../core/CellEntry";

export interface CellSymbolProps {
    cellEntry: CellEntry;
    visibility: number;
}

const X_COLOR = "#FF5722"; // Reddish-orange for X
const O_COLOR = "#2196F3"; // Blue for O

export default function CellSymbol(props: CellSymbolProps) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 50 50"
            style={{ opacity: props.visibility, transition: "opacity 0.2s ease-in-out" }}
        >
            <defs>
                <filter id="cell-symbol-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(16, 22, 25, 0.5)" />
                </filter>
            </defs>

            <g
                transform="translate(25, 25) scale(0.5) translate(-25, -25)"
                strokeWidth="5" strokeLinecap="round"
            >
                {
                    props.cellEntry === CellEntry.X &&
                    <>
                        <line
                            x1="5" y1="5" x2="45" y2="45"
                            stroke={X_COLOR}
                            filter="url(#cell-symbol-shadow)"
                        />
                        <line
                            x1="45" y1="5" x2="5" y2="45"
                            stroke={X_COLOR}
                            filter="url(#cell-symbol-shadow)"
                        />
                    </>
                }
                {
                    props.cellEntry === CellEntry.O &&
                    <circle
                        cx="25" cy="25" r="20" fill="none"
                        stroke={O_COLOR}
                        filter="url(#cell-symbol-shadow)"
                    />
                }
            </g>
        </svg>
    );
}
