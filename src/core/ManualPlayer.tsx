import readline from "node:readline";
import { CellPosition } from "./Cell";
import Player from "./Player";

export default class ManualPlayer extends Player {
    public async selectCellPositionToMakeMove(): Promise<CellPosition> {
        return ManualPlayer.getCellPositionForUserInput(await ManualPlayer.getUserInput());
    }

    public static getUserInput(): Promise<number> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve) => {
            rl.question("Enter position [1, ..., 9]: ", (answer: String) => {
                rl.close();
                return resolve(Number(answer));
            });
        });
    }

    public static getCellPositionForUserInput(input: number): CellPosition {
        const userInputToCellPositionMap = new Map([
            [1, { row: 0, col: 0 }],
            [2, { row: 0, col: 1 }],
            [3, { row: 0, col: 2 }],
            [4, { row: 1, col: 0 }],
            [5, { row: 1, col: 1 }],
            [6, { row: 1, col: 2 }],
            [7, { row: 2, col: 0 }],
            [8, { row: 2, col: 1 }],
            [9, { row: 2, col: 2 }],
        ]);
        return userInputToCellPositionMap.get(input) as CellPosition;
    }
}
