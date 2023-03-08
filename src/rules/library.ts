import {std} from "./std/ruleset";
import {StdPieceType} from "./std/pieceTypes";
import {AnaModifier, AnaPieceType, AnaValidator} from "./anarchy/enums";
import {anarchy} from "./anarchy/ruleset";
import {PieceDict} from "../model/rules";
import {RuleModifier} from "../model/modifiers";
import {MoveValidator} from "../model/moves";

export const library = {
    "std": std,
    "ana": anarchy,
};

export const shortForms = {
    "p": StdPieceType.Pawn,
    "n": StdPieceType.Horsey,
    "b": StdPieceType.Bishop,
    "k": StdPieceType.King,
    "r": StdPieceType.Rook,
    "q": StdPieceType.Queen,
}

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

export function allValidators() {
    const validators: Record<string, MoveValidator> = {};
    for (const pack of Object.values(library)) {
        for (const [id, validator] of Object.entries(pack.validators)) {
            validators[id] = validator;
        }
    }
    return validators;
}

export type Package = keyof typeof library;
export type PieceType = StdPieceType | AnaPieceType;
export type Modifier = AnaModifier;
export type ValidatorId = AnaValidator;