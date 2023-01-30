import {Piece, Side} from "../../model/types";
import {pieceCatalog} from "./pieces";
import {StdPieceType} from "./pieceTypes";

export function defaultPieces() {
    const backRow: StdPieceType[] = [StdPieceType.Rook, StdPieceType.Bishop, StdPieceType.Horsey, StdPieceType.Queen, StdPieceType.King, StdPieceType.Horsey, StdPieceType.Bishop, StdPieceType.Rook];
    const frontRow: StdPieceType[] = [StdPieceType.Pawn, StdPieceType.Pawn, StdPieceType.Pawn, StdPieceType.Pawn, StdPieceType.Pawn, StdPieceType.Pawn, StdPieceType.Pawn, StdPieceType.Pawn];

    const pieces: Piece[] = [];
    backRow.forEach((piece, index) => {
        const validators = pieceCatalog[piece].validators(Side.White);
        pieces.push({
            row: 1,
            col: index + 1,
            color: Side.White,
            renderAs: pieceCatalog[piece].renderAs,
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
            renderAs: pieceCatalog[piece].renderAs,
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
            renderAs: pieceCatalog[piece].renderAs,
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
            renderAs: pieceCatalog[piece].renderAs,
            pieceType: piece,
            validators: validators,
        });
    });
    return pieces;
}