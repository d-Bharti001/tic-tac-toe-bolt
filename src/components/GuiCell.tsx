import { useState } from "react";
import { CellPosition } from "../core/Cell";
import { CellEntry } from "../core/CellEntry";
import CellSymbol from "./icons/CellSymbol";

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
                background: "#263238",
                transition: "box-shadow 0.3s ease-in-out",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                boxShadow: decideCellBackground(cellPosition) === CellBackground.NORMAL
                    ? "inset 0px 0px 10px rgba(0, 0, 0, 0.5)"
                    : "inset 0px 0px 10px rgba(255, 249, 196, 0.8)"
            }}
        >
            <CellSymbol
                cellEntry={decideCellEntry(cellPosition, hovering)}
                visibility={decideCellEntryVisibility(cellPosition, hovering)}
            />
        </div>
    );
}
