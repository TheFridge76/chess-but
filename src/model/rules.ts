import {PieceType, Side, TPiece} from "./types";
import {MoveValidator} from "./moves";
import {library, Package} from "../rules/library";
import {HandlerDict} from "./results";

//TODO Replace PieceType by something more modular/extensible
type PieceDict<T extends string> = Record<T, {
    validators: (side: Side) => MoveValidator[][],
    promotable: boolean,
}>;

export type Rules = {
    titleText: string,
    description: string,
    playableSides: Side[],
    baseRuleSet: Package,
};

export type GameRules = {
    playableSides: Side[],
    pieces: PieceDict<PieceType>,
    setup: TPiece[],
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
    pieces: PieceDict<string>,
    setup: TPiece[],
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