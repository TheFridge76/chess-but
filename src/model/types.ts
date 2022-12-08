import {Result} from "./results";

export type Square = {
    row: number,
    col: number,
}

export function sameSquare(squareA: Square, squareB: Square) {
    return squareA.row === squareB.row && squareA.col === squareB.col;
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
    history: Result[],
}

export type MoveCondition = (from: Square, to: Square, state: GameState) => boolean;
export type MoveValidator = (from: Square, to: Square, state: GameState) => Result[];
export type StateUpdater = (update: Result) => void;