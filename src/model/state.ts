import {CaptureResult, EndTurnResult, MoveResult, PromotionResult, ReplaceResult, Result, ResultType} from "./results";
import {Side, Square, TPiece} from "./types";
import React from "react";
import {handlers} from "../rules/resultHandlers/std";

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

export function makeNewState(state: GameState, action: Result) {
    return {
        activeSide: state.activeSide,
        phase: structuredClone(state.phase),
        pieces: state.pieces,
        history: [...state.history, action],
    };
}

export const updateState = (state: GameState, action: Result) => {
    let newState = state;
    switch (action.type) {
        case ResultType.Capture:
            newState = handlers[ResultType.Capture].reduce((state, handler) => {
                return handler(state, action as CaptureResult);
            }, newState);
            break;
        case ResultType.EndTurn:
            newState = handlers[ResultType.EndTurn].reduce((state, handler) => {
                return handler(state, action as EndTurnResult);
            }, newState);
            break;
        case ResultType.Move:
            newState = handlers[ResultType.Move].reduce((state, handler) => {
                return handler(state, action as MoveResult);
            }, newState);
            break;
        case ResultType.Promotion:
            newState = handlers[ResultType.Promotion].reduce((state, handler) => {
                return handler(state, action as PromotionResult);
            }, newState);
            break;
        case ResultType.Replace:
            newState = handlers[ResultType.Replace].reduce((state, handler) => {
                return handler(state, action as ReplaceResult);
            }, newState);
            break;
    }
    return newState;
}