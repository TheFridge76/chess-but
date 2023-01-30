import {std} from "./std/ruleset";
import {StdPieceType} from "./std/pieceTypes";
import {AnaPieceType} from "./anarchy/pieceTypes";
import {anarchy} from "./anarchy/ruleset";
import {PieceDict} from "../model/rules";
import {RuleModifier} from "../model/modifiers";

export const library = {
    "std": std,
    "ana": anarchy,
};

// TODO Unify these functions
export function allPieces() {
    const pieces: PieceDict<string> = {};
    for (const pack of Object.values(library)) {
        for (const [type, rules] of Object.entries(pack.pieces)) {
            pieces[type] = rules;
        }
    }
    return pieces;
}

export function allModifiers() {
    const modifiers: Record<string, RuleModifier> = {};
    for (const pack of Object.values(library)) {
        for (const [id, modifier] of Object.entries(pack.modifiers)) {
            modifiers[id] = modifier;
        }
    }
    return modifiers;
}

export type Package = keyof typeof library;
export type PieceType = StdPieceType | AnaPieceType;