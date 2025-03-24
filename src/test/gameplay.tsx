import AutomatedPlayer from "../core/AutomatedPlayer";
import Game from "../core/Game";
import ManualPlayer from "../core/ManualPlayer";

function waitForMillis(millis: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    });
}

async function playGame() {
    const playerA = new ManualPlayer("You");
    const playerB = new AutomatedPlayer("Computer");

    const game = Game.create(playerA, playerB);

    while (!game.isGameComplete()) {
        console.log("Board ######");
        game.board.printBoard(game);
        console.log("############");
        const player = game.getCurrentPlayer();
        try {
            await waitForMillis(800);
            console.log(`Requesting ${player.name} to make move...`);
            await player.makeMove(game);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    if (game.isGameComplete()) {
        console.log(`***** ${game.whoWonTheGame()?.name} Won! *****`);
        game.board.printBoard(game);
    }
}

playGame();
