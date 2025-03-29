import { useGameplay } from "../contexts/GameplayContext";
import ManualPlayer from "../core/ManualPlayer";

export default function GuiGameStatus() {
    const { gameState } = useGameplay();

    const isGameStarted = Boolean(gameState);
    const isGameComplete = Boolean(gameState && gameState.completed);
    const isPlayerWinner = Boolean(gameState && gameState.winner instanceof ManualPlayer);

    const gameStatus: string =
        !isGameStarted
            ? "NOT_STARTED"
            : !isGameComplete
                ? "IN_PROGRESS"
                : isPlayerWinner
                    ? "WIN"
                    : "LOSE";

    return (
        <div
            className="game-status"
            style={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "100%",
                height: 60,
            }}
        >
            {
                gameStatus !== "WIN" &&
                <div
                    style={{
                        display: "inline-block",
                        color: "rgb(38, 50, 56)",
                        fontFamily: "Comfortaa, Trebuchet MS, Arial, sans-serif",
                        fontOpticalSizing: "auto",
                        fontSize: "160%",
                        fontWeight: "800",
                    }}
                >
                    It's a l
                    <span
                        style={{
                            color: "rgb(238, 238, 238)",
                            textShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        ooo
                    </span>
                    ng way to go...
                </div>
            }
            {
                gameStatus === "WIN" &&
                <div
                    style={{
                        display: "inline-block",
                        fontSize: "240%",
                        textShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)"
                    }}
                >
                    🎉
                </div>
            }
        </div>
    );
}
