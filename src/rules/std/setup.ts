import {TPiece, PieceType, Side} from "../../model/types";
import {pieceCatalog} from "./pieces";

export function defaultPieces() {
    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    const pieces: TPiece[] = [];
    backRow.forEach((piece, index) => {
        const validators = pieceCatalog[piece].validators(Side.White);
        pieces.push({
            row: 1,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validators: validators,
        });
    });
    frontRow.forEach((piece, index) => {
        const validators = pieceCatalog[piece].validators(Side.White);
        pieces.push({
            row: 2,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validators: validators,
        });
    });
    backRow.forEach((piece, index) => {
        const validators = pieceCatalog[piece].validators(Side.Black);
        pieces.push({
            row: 8,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validators: validators,
        });
    });
    frontRow.forEach((piece, index) => {
        const validators = pieceCatalog[piece].validators(Side.Black);
        pieces.push({
            row: 7,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validators: validators,
        });
    });
    return pieces;
}