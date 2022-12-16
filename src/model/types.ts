import {MoveValidator} from "./moves";

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
    validators: MoveValidator[],
};

export function clonePiece(piece: TPiece): TPiece {
    return {
        pieceType: piece.pieceType,
        color: piece.color,
        row: piece.row,
        col: piece.col,
        validators: piece.validators,
    };
}

