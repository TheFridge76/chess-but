import {Result} from "./results";
import {Side, TPiece} from "./types";
import React from "react";

export enum GamePhase {
    Turn,
    Promotion,
}

export type GameState = {
    activeSide: Side,
    phase: GamePhase,
    pieces: TPiece[],
    history: Result[],
}

export type StateUpdater = React.Dispatch<Result>;

export const updateState = (state: GameState, action: Result) => {
    return action.apply(state);
}