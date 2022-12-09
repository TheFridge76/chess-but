import {Result} from "./results";
import {GameState} from "./state";

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

export function clonePiece(piece: TPiece): TPiece {
    return {
        pieceType: piece.pieceType,
        color: piece.color,
        row: piece.row,
        col: piece.col,
        validatorsPos: piece.validatorsPos,
        validatorsNeg: piece.validatorsNeg,
    };
}

export type MoveCondition = (from: Square, to: Square, state: GameState) => boolean;
export type MoveValidator = (from: Square, to: Square, state: GameState) => Result[];