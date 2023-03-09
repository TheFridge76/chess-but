import {RuleSet} from "../../model/rules";
import {pieceCatalog} from "./pieces";
import {handlers} from "./resultHandlers";

export const std: RuleSet = {
    id: "std",
    pieces: pieceCatalog,
    validators: {}, //TODO Add validator catalog
    resultHandlers: handlers,
    setup: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    modifiers: {},
};