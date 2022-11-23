export type Square = {
    row: number,
    col: number,
}

export enum ResultType {
    Move,
    Capture,
    EndTurn,
}

export type Result = {
    type: ResultType,
}

export enum Side {
    White = "white",
    Black = "black",
}

export type PieceType = "pawn" | "rook" | "horsey" | "bishop" | "queen" | "king";

export type TPiece = {
    pieceType: PieceType,
    color: Side,
    row: number,
    col: number,
    validatorsPos: MoveValidator[],
    validatorsNeg: MoveValidator[],
};

export type GameState = {
    activeSide: Side,
    pieces: TPiece[],
}

//TODO Include actual result in return value
export type MoveValidator = (from: Square, to: Square, state: GameState) => boolean;

export type StateUpdater = (update: Result) => void;
