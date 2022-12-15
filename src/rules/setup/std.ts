import {TPiece, PieceType, Side} from "../../model/types";
import {
    activeSide,
    attackedSquare,
    emptyPath,
    kingAttacked,
    occupiedAlly,
    onField,
    standardMove
} from "../validators/util";
import {
    BishopCondition,
    Castling, HolyHell,
    HowDoesItMoveCondition,
    KingCondition,
    Pawn,
    PawnCapture,
    RookCondition
} from "../validators/std";
import {every, negate, some} from "../validators/modifiers";
import {MoveValidator} from "../../model/moves";

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
            validatorsPos.push(Pawn, PawnCapture, HolyHell);
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

function getValidatorsNeg(piece: PieceType, side: Side) {
    const validatorsNeg = [negate(activeSide(side)), negate(onField), occupiedAlly, kingAttacked];
    switch(piece) {
        case "king":
            validatorsNeg.push(attackedSquare);
            break;
    }
    return validatorsNeg;
}

export function defaultPieces() {
    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    const pieces: TPiece[] = [];
    backRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        const validatorsNeg = getValidatorsNeg(piece, Side.White);
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
        const validatorsNeg = getValidatorsNeg(piece, Side.White);
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
        const validatorsNeg = getValidatorsNeg(piece, Side.Black);
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
        const validatorsNeg = getValidatorsNeg(piece, Side.Black);
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