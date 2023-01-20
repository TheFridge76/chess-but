import {RuleSet} from "../../model/rules";
import {pieceCatalog} from "./pieces";
import {handlers} from "./resultHandlers";
import {defaultPieces} from "./setup";

export const std: RuleSet = {
    id: "std",
    pieces: pieceCatalog,
    resultHandlers: handlers,
    setup: defaultPieces(),
    modifiers: [],
};