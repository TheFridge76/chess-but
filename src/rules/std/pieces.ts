import {
    activeSide,
    attackedSquare,
    emptyPath,
    pieceAttacked,
    occupiedAlly,
    onField,
    standardMove
} from "../util/validators";
import {every, negate, some} from "../util/modifiers";
import {
    BishopCondition,
    Castling,
    HolyHell,
    HowDoesItMoveCondition,
    KingCondition, Pawn,
    PawnCapture, Promotion, RookCondition
} from "./validators";
import {PieceRules} from "../../model/rules";
import {StdPieceType} from "./pieceTypes";

export const pieceCatalog: Record<StdPieceType, PieceRules> = {
    [StdPieceType.Horsey]: {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(pieceAttacked(StdPieceType.King)), standardMove(HowDoesItMoveCondition)]],
        promotable: true,
        renderAs: "horsey",
    },
    [StdPieceType.Bishop]: {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(pieceAttacked(StdPieceType.King)), standardMove(every(BishopCondition, emptyPath))]],
        promotable: true,
        renderAs: "bishop",
    },
    [StdPieceType.King]: {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(pieceAttacked(StdPieceType.King)), standardMove(KingCondition), Castling, negate(attackedSquare)]],
        promotable: false,
        renderAs: "king",
    },
    [StdPieceType.Pawn]: {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(pieceAttacked(StdPieceType.King)), Pawn, PawnCapture, HolyHell], [Promotion(side)]],
        promotable: false,
        renderAs: "pawn",
    },
    [StdPieceType.Queen]: {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(pieceAttacked(StdPieceType.King)), standardMove(every(some(RookCondition, BishopCondition), emptyPath))]],
        promotable: true,
        renderAs: "queen",
    },
    [StdPieceType.Rook]: {
        validators: (side) => [[activeSide(side), onField, negate(occupiedAlly), negate(pieceAttacked(StdPieceType.King)), standardMove(every(RookCondition, emptyPath))]],
        promotable: true,
        renderAs: "rook",
    },
};