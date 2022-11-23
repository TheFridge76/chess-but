import {MoveValidator, TPiece, PieceType, Side} from "../Types";
import {negate, onField} from "../util";
import {bishop, howDoesItMove, king, pawn, queen, rook} from "../std";

function getValidatorsPos(piece: PieceType) {
    const validatorsPos: MoveValidator[] = [];
    switch(piece) {
        case "horsey":
            validatorsPos.push(howDoesItMove);
            break;
        case "bishop":
            validatorsPos.push(bishop);
            break;
        case "king":
            validatorsPos.push(king);
            break;
        case "pawn":
            validatorsPos.push(pawn);
            break;
        case "queen":
            validatorsPos.push(queen);
            break;
        case "rook":
            validatorsPos.push(rook);
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
            validatorsNeg: [negate(onField)],
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
            validatorsNeg: [negate(onField)],
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
            validatorsNeg: [negate(onField)],
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
            validatorsNeg: [negate(onField)],
        });
    });
    return pieces;
}