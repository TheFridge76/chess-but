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
    PawnCapture, Promotion,
    RookCondition
} from "../validators/std";
import {every, negate, some} from "../validators/modifiers";
import {MoveValidator} from "../../model/moves";

function getValidators(piece: PieceType, side: Side) {
    const validators: MoveValidator[] = [activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked)];
    switch(piece) {
        case "horsey":
            validators.push(standardMove(HowDoesItMoveCondition));
            break;
        case "bishop":
            validators.push(standardMove(every(BishopCondition, emptyPath)));
            break;
        case "king":
            validators.push(standardMove(KingCondition), Castling, negate(attackedSquare));
            break;
        case "pawn":
            validators.push(Pawn, PawnCapture, HolyHell, Promotion);
            break;
        case "queen":
            validators.push(standardMove(every(some(RookCondition, BishopCondition), emptyPath)));
            break;
        case "rook":
            validators.push(standardMove(every(RookCondition, emptyPath)));
            break;
    }
    return validators;
}

export function defaultPieces() {
    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    const pieces: TPiece[] = [];
    backRow.forEach((piece, index) => {
        const validators = getValidators(piece, Side.White);
        pieces.push({
            row: 1,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validators: validators,
        });
    });
    frontRow.forEach((piece, index) => {
        const validators = getValidators(piece, Side.White);
        pieces.push({
            row: 2,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validators: validators,
        });
    });
    backRow.forEach((piece, index) => {
        const validators = getValidators(piece, Side.Black);
        pieces.push({
            row: 8,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validators: validators,
        });
    });
    frontRow.forEach((piece, index) => {
        const validators = getValidators(piece, Side.Black);
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