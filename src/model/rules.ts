import {Side, Piece, Skin} from "./types";
import {MoveValidator} from "./moves";
import {library, Package, PieceType} from "../rules/library";
import {HandlerDict} from "./results";

export type PieceRules = {
    validators: (side: Side) => MoveValidator[][],
    promotable: boolean,
    renderAs: Skin,
};
type PieceDict = Record<PieceType, PieceRules>;

// Rules as set in the setup, serializable
export type Rules = {
    titleText: string,
    description: string,
    playableSides: Side[],
    baseRuleSet: Package,
};

// Rules as used during a game
// TODO Maybe just use a RuleSet for this?
export type GameRules = {
    playableSides: Side[],
    pieces: PieceDict,
    setup: Piece[],
    resultHandlers: HandlerDict,
};

export function toGameRules(rules: Rules): GameRules {
    const gameRules = {
        playableSides: rules.playableSides,
        pieces: library[rules.baseRuleSet].pieces,
        setup: library[rules.baseRuleSet].setup,
        resultHandlers: library[rules.baseRuleSet].resultHandlers,
    };
    //TODO Apply modifiers
    return gameRules;
}

export type RuleSet = {
    id: string, // std/anarchy/... Prepend to piece names?
    pieces: PieceDict,
    setup: Piece[],
    resultHandlers: HandlerDict,
    //layers: any, //TODO Minesweeper oder so?
    modifiers: RuleModifier[],
};

// Modifies a RuleSet by adding pieces, changing pieces, ...
// addPiece(Piece)
// removePiece(PieceID)
// addValidator(PieceID, validator)
// addHandler(Handler)
// removeHandler(HandlerID)?
// resetHandlers(ResultType)?
export type RuleModifier = {};