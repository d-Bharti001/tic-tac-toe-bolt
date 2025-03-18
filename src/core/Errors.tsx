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

export class EmptyCellEntryError extends Error {
    constructor() {
        super();
        this.name = "EmptyCellEntryError";
        this.message = "Empty cell entry isn't allowed here";
    }
}

export class InvalidCellAssociationError extends Error {
    constructor() {
        super();
        this.name = "InvalidCellAssociationError";
        this.message = "Invalid cell and player association";
    }
}
