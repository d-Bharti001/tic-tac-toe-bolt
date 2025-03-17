export class InvalidCellAccessError extends Error {
    constructor() {
        super();
        this.name = "InvalidCellAccessError";
        this.message = "Invalid cell";
    }
}

export class FilledCellError extends Error {
    constructor() {
        super();
        this.name = "FilledCellError";
        this.message = "Cell already filled";
    }
}

export class InvalidMoveError extends Error {
    constructor() {
        super();
        this.name = "InvalidMoveError";
        this.message = "Invalid move";
    }
}

export class MoveRevertedError extends Error {
    constructor() {
        super();
        this.name = "RevertedMoveError";
        this.message = "Cannot revert move: already reverted";
    }
}
