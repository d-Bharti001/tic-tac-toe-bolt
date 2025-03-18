import AutomatedPlayer from "../core/AutomatedPlayer";
import Game from "../core/Game";
import ManualPlayer from "../core/ManualPlayer";

async function playGame() {
    const playerA = new ManualPlayer("You");
    const playerB = new AutomatedPlayer("Computer");

    const game = new Game(playerA, playerB);

    while (!game.isGameComplete()) {
        console.log("Board ######");
        game.board.printBoard();
        console.log("############");
        const player = game.getCurrentPlayer();
        try {
            console.log(`Requesting ${player.name} to make move...`);
            await player.makeMove(game);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    if (game.isGameComplete()) {
        console.log(`***** ${game.whoWonTheGame()?.name} Won! *****`);
        game.board.printBoard();
    }
}

playGame();
