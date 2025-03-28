import Footer from "./Footer";
import GuiBoard from "./GuiBoard";
import GuiGameStatus from "./GuiGameStatus";
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
                width: "min(80vw, 600px)",
                padding: "20px",
                gap: "20px",
                margin: "50px auto",
            }}
        >
            <GuiBoard />
            <RestartButton />
            <GuiGameStatus />
            <Footer />
        </div>
    );
}
