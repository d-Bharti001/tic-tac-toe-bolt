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
            ? "INCOMPLETE"
            : isPlayerWinner
            ? "WIN"
            : "LOSE";

    return (
        <h3>
        {
            (gameStatus === "NOT_STARTED" || gameStatus === "INCOMPLETE") &&
            <>
                It's a looong way to go...
            </>
        }
        {
            gameStatus === "WIN" &&
            <>
                🎉
            </>
        }
        {
            gameStatus === "LOSE" &&
            <>
                Try again? ✌️
            </>
        }
        </h3>
    );
}