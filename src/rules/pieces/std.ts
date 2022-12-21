import {PieceType, Side} from "../../model/types";
import {MoveValidator} from "../../model/moves";
import {
    activeSide,
    attackedSquare,
    emptyPath,
    kingAttacked,
    occupiedAlly,
    onField,
    standardMove
} from "../validators/util";
import {every, negate, some} from "../validators/modifiers";
import {
    BishopCondition,
    Castling,
    HolyHell,
    HowDoesItMoveCondition,
    KingCondition, Pawn,
    PawnCapture, Promotion, RookCondition
} from "../validators/std";

export const pieceCatalog: Record<PieceType, {
    validators: (side: Side) => MoveValidator[][],
    promotable: boolean,
}> = {
    "horsey": {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked), standardMove(HowDoesItMoveCondition)]],
        promotable: true,
    },
    "bishop": {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked), standardMove(every(BishopCondition, emptyPath))]],
        promotable: true,
    },
    "king": {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked), standardMove(KingCondition), Castling, negate(attackedSquare)]],
        promotable: false,
    },
    "pawn": {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked), Pawn, PawnCapture, HolyHell], [Promotion(side)]],
        promotable: false,
    },
    "queen": {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked), standardMove(every(some(RookCondition, BishopCondition), emptyPath))]],
        promotable: true,
    },
    "rook": {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(kingAttacked), standardMove(every(RookCondition, emptyPath))]],
        promotable: true,
    },
};