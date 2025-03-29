import GuiBoard from "./GuiBoard";
import GuiGameStatus from "./GuiGameStatus";
import Info from "./Info";
import RestartButton from "./RestartButton";

export default function GameCanvas() {
    return (
        <div
            className="game-canvas"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "360px",
                gap: "16px",
                margin: "40px",
            }}
        >
            <Info />
            <GuiBoard />
            <RestartButton />
            <GuiGameStatus />
        </div>
    );
}
