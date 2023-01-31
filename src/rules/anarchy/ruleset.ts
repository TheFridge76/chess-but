import {RuleSet} from "../../model/rules";
import {pieceCatalog} from "./pieces";
import {AnaModifier, AnaPieceType, AnaValidator} from "./enums";
import {addPiece, addValidator} from "../../model/modifiers";
import {validatorCatalog} from "./validators";
import {StdPieceType} from "../std/pieceTypes";

export const anarchy: RuleSet = {
    id: "ana",
    pieces: pieceCatalog,
    validators: validatorCatalog,
    modifiers: {
        [AnaModifier.AddKnook]: addPiece(AnaPieceType.Knook),
        [AnaModifier.EnableIlVaticano]: addValidator({
            id: AnaValidator.IlVaticano,
            piece: StdPieceType.Bishop,
            stage: 0,
        }),
        //TODO ana::pipi => Show warning after en passant denied
        //TODO ana::autoBong
        //TODO ana::enableSiberianSwipe
        //TODO ana::enableKnightBoost
    },
};