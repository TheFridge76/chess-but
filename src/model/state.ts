import {Result} from "./results";
import {Side, Square, TPiece} from "./types";
import React from "react";

export enum GamePhase {
    Turn,
    Promotion,
}

export type GameState = {
    activeSide: Side,
    phase: PhaseState,
    pieces: TPiece[],
    history: Result[],
};

type PhaseState = PhaseTurnState | PhasePromotionState;

type PhaseTurnState = {
    type: GamePhase.Turn,
    data: {},
};

type PhasePromotionState = {
    type: GamePhase.Promotion,
    data: {
        on: Square,
        side: Side,
    },
};

export type StateUpdater = React.Dispatch<Result>;

export const updateState = (state: GameState, action: Result) => {
    return action.apply(state);
}