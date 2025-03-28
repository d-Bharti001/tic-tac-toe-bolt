import Footer from "./Footer";
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
                gap: "20px",
                margin: "40px auto",
            }}
        >
            <Info />
            <GuiBoard />
            <RestartButton />
            <GuiGameStatus />
            <Footer />
        </div>
    );
}
