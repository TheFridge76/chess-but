import {RuleSet} from "../../model/rules";
import {pieceCatalog} from "./pieces";
import {AnaPieceType} from "./pieceTypes";
import {addPiece} from "../../model/modifiers";

export const anarchy: RuleSet = {
    id: "ana",
    pieces: pieceCatalog,
    modifiers: {
        "ana::addKnook": addPiece(AnaPieceType.Knook),
    },
};