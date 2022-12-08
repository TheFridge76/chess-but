import {MoveValidator, TPiece, PieceType, Side} from "../../model/types";
import {emptyPath, occupiedAlly, onField, standardMove} from "../validators/util";
import {
    BishopCondition,
    Castling,
    HowDoesItMoveCondition,
    KingCondition,
    Pawn,
    PawnCapture,
    RookCondition
} from "../validators/std";
import {every, negate, some} from "../validators/modifiers";

function getValidatorsPos(piece: PieceType) {
    const validatorsPos: MoveValidator[] = [];
    switch(piece) {
        case "horsey":
            validatorsPos.push(standardMove(HowDoesItMoveCondition));
            break;
        case "bishop":
            validatorsPos.push(standardMove(every(BishopCondition, emptyPath)));
            break;
        case "king":
            validatorsPos.push(standardMove(KingCondition), Castling);
            break;
        case "pawn":
            validatorsPos.push(Pawn, PawnCapture);
            break;
        case "queen":
            validatorsPos.push(standardMove(every(some(RookCondition, BishopCondition), emptyPath)));
            break;
        case "rook":
            validatorsPos.push(standardMove(every(RookCondition, emptyPath)));
            break;
    }
    return validatorsPos;
}

export function defaultPieces() {
    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    const validatorsNeg = [standardMove(negate(onField)), standardMove(occupiedAlly)];

    const pieces: TPiece[] = [];
    backRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 1,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: validatorsNeg,
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
            validatorsNeg: validatorsNeg,
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
            validatorsNeg: validatorsNeg,
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
            validatorsNeg: validatorsNeg,
        });
    });
    return pieces;
}