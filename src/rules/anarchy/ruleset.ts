import {RuleSet} from "../../model/rules";
import {pieceCatalog} from "./pieces";
import {AnaModifier, AnaPieceType, AnaValidator} from "./enums";
import {addPiece, addValidator, changeSetup} from "../../model/modifiers";
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
        [AnaModifier.AutoBong]: changeSetup("rnbqkbnr/pppp2pp/8/3BppB1/8/8/PPPPPPPP/RN1QK1NR"),
        //TODO ana::pipi => Show warning after en passant denied
        //TODO ana::enableSiberianSwipe
        //TODO ana::enableKnightBoost
    },
};