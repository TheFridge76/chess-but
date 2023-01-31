import {RuleSet} from "../../model/rules";
import {pieceCatalog} from "./pieces";
import {AnaModifier, AnaPieceType} from "./enums";
import {addPiece} from "../../model/modifiers";

export const anarchy: RuleSet = {
    id: "ana",
    pieces: pieceCatalog,
    modifiers: {
        [AnaModifier.AddKnook]: addPiece(AnaPieceType.Knook),
        //TODO ana::enableIlVaticano
        //TODO ana::pipi => Show warning after en passant denied
        //TODO ana::autoBong
        //TODO ana::enableSiberianSwipe
        //TODO ana::enableKnightBoost
    },
};