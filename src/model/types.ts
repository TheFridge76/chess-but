import {MoveValidator} from "./moves";
import {PieceType} from "../rules/library";

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

export type Skin = string;

export type PieceStaticProps = {
    pieceType: PieceType,
    color: Side,
    renderAs: Skin,
}
export type PieceDynamicProps = {
    row: number,
    col: number,
    validators: MoveValidator[][],
}
export type Piece = PieceStaticProps & PieceDynamicProps;

export function clonePiece(piece: Piece): Piece {
    return {
        pieceType: piece.pieceType,
        color: piece.color,
        renderAs: piece.renderAs,
        row: piece.row,
        col: piece.col,
        validators: piece.validators,
    };
}

