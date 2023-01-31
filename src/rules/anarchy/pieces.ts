import {PieceRules} from "../../model/rules";
import {AnaPieceType} from "./enums";
import {activeSide, emptyPath, occupiedAlly, onField, pieceAttacked, standardMove} from "../util/validators";
import {every, negate, some} from "../util/modifiers";
import {StdPieceType} from "../std/pieceTypes";
import {HowDoesItMoveCondition, RookCondition} from "../std/validators";

export const pieceCatalog: Record<AnaPieceType, PieceRules> = {
    [AnaPieceType.Knook]: {
        validators: (side) => [[
            activeSide(side),
            onField,
            negate(occupiedAlly),
            negate(pieceAttacked(StdPieceType.King)),
            standardMove(every(some(RookCondition, HowDoesItMoveCondition), emptyPath))
        ]],
        promotable: true,
        renderAs: "knook",
    },
};