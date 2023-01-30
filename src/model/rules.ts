import {Side, Piece, Skin} from "./types";
import {MoveValidator} from "./moves";
import {allModifiers, library, Package, PieceType} from "../rules/library";
import {HandlerDict, noHandlers} from "./results";
import {RuleModifier} from "./modifiers";

export type PieceRules = {
    validators: (side: Side) => MoveValidator[][],
    promotable: boolean,
    renderAs: Skin,
};
export type PieceDict<T extends string> = Partial<Record<T, PieceRules>>;

// Rules as set in the setup, serializable
export type Rules = {
    titleText: string,
    description: string,
    playableSides: Side[],
    baseRuleSet: Package,
    modifiers: string[], // TODO Can I typecheck this or should I just give up?
};

// Rules as used during a game
// TODO Maybe just use a RuleSet for this?
export type GameRules = {
    playableSides: Side[],
    pieces: PieceDict<PieceType>,
    setup: Piece[],
    resultHandlers: HandlerDict,
};

export function toGameRules(rules: Rules): GameRules {
    let gameRules = {
        playableSides: rules.playableSides,
        pieces: library[rules.baseRuleSet].pieces,
        setup: library[rules.baseRuleSet].setup ?? [],
        resultHandlers: library[rules.baseRuleSet].resultHandlers ?? noHandlers,
    };
    for (const modifierId of rules.modifiers) {
        const modifier = Object.entries(allModifiers()).find(([id, _]) => id === modifierId);
        if (modifier === undefined) {
            console.error(`Could not find modifier ${modifierId}`);
            continue;
        }
        gameRules = modifier[1](gameRules);
    }
    return gameRules;
}

export type RuleSet = {
    id: string, // std/anarchy/... Prepend to piece names?
    pieces: PieceDict<string>,
    setup?: Piece[],
    resultHandlers?: HandlerDict,
    //layers: any, //TODO Minesweeper oder so?
    modifiers: Record<string, RuleModifier>,
};