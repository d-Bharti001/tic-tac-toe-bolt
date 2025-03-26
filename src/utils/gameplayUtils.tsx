import AutomatedPlayer from "../core/AutomatedPlayer";
import Game from "../core/Game";
import ManualPlayer from "../core/ManualPlayer";

export function getManualPlayer(game: Game): ManualPlayer | null {
    return game.playerA instanceof ManualPlayer
        ? game.playerA
        : game.playerB instanceof ManualPlayer
            ? game.playerB
            : null;
}

export function getAutomatedPlayer(game: Game): AutomatedPlayer | null {
    return game.playerB instanceof AutomatedPlayer
        ? game.playerB
        : game.playerA instanceof AutomatedPlayer
            ? game.playerA
            : null;
}

export function waitForMillis(millis: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    });
}
