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
        <>
        {
            (gameStatus === "NOT_STARTED" || gameStatus === "IN_PROGRESS") &&
            <h3>
                It's a looong way to go...
            </h3>
        }
        {
            gameStatus === "WIN" &&
            <h2>
                🎉
            </h2>
        }
        </>
    );
}
