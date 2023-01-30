import {std} from "./std/ruleset";
import {StdPieceType} from "./std/pieceTypes";

//TODO Create global list of namespaced piecetypes, etc.
export const library = {
    "std": std,
};

export type Package = keyof typeof library;
export type PieceType = StdPieceType;