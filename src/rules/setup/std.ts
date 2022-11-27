import {MoveValidator, TPiece, PieceType, Side} from "../types";
import {negate, onField, standardMove} from "../validators/util";
import {Bishop, Castling, HowDoesItMove, King, Pawn, PawnCapture, Queen, Rook} from "../validators/std";

function getValidatorsPos(piece: PieceType) {
    const validatorsPos: MoveValidator[] = [];
    switch(piece) {
        case "horsey":
            validatorsPos.push(HowDoesItMove);
            break;
        case "bishop":
            validatorsPos.push(Bishop);
            break;
        case "king":
            validatorsPos.push(King, Castling);
            break;
        case "pawn":
            validatorsPos.push(Pawn, PawnCapture);
            break;
        case "queen":
            validatorsPos.push(Queen);
            break;
        case "rook":
            validatorsPos.push(Rook);
            break;
    }
    return validatorsPos;
}

export function defaultPieces() {
    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    const pieces: TPiece[] = [];
    backRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 1,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [standardMove(negate(onField))],
        });
    });
    frontRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 2,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [standardMove(negate(onField))],
        });
    });
    backRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 8,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [standardMove(negate(onField))],
        });
    });
    frontRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 7,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [standardMove(negate(onField))],
        });
    });
    return pieces;
}