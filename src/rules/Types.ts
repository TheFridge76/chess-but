export type Square = {
    row: number,
    col: number,
}

/*enum ResultType {
    Move,
    Capture,
    EndTurn,
}*/

export enum Side {
    White = "white",
    Black = "black",
}

export type PieceType = "pawn" | "rook" | "horsey" | "bishop" | "queen" | "king";

export type PieceState = {
    pieceType: PieceType,
    color: Side,
    row: number,
    col: number,
    validatorsPos: MoveValidator[],
    validatorsNeg: MoveValidator[],
};

export type GameState = {
    activeSide: Side,
    pieces: PieceState[],
}

//TODO Include actual result in return value
export type MoveValidator = (from: Square, to: Square, state: GameState) => boolean;
