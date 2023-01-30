import {Side, Square, Piece} from "./types";
import {GameState} from "./state";

export enum ResultType {
    Move,
    Capture,
    EndTurn,
    Promotion,
    Replace,
}

export type MoveResult = {
    type: ResultType.Move,
    from: Square,
    to: Square,
}

export type CaptureResult = {
    type: ResultType.Capture,
    on: Square,
}

export type EndTurnResult = {
    type: ResultType.EndTurn,
}

export type PromotionResult = {
    type: ResultType.Promotion,
    on: Square,
    side: Side,
}

export type ReplaceResult = {
    type: ResultType.Replace,
    on: Square,
    piece: Piece,
}

export type Result = MoveResult | CaptureResult | EndTurnResult | PromotionResult | ReplaceResult;

export type ResultHandler<T extends Result> = (state: GameState, result: T) => GameState;

export type HandlerDict = {
    [ResultType.Capture]: ResultHandler<CaptureResult>[],
    [ResultType.EndTurn]: ResultHandler<EndTurnResult>[],
    [ResultType.Move]: ResultHandler<MoveResult>[],
    [ResultType.Promotion]: ResultHandler<PromotionResult>[],
    [ResultType.Replace]: ResultHandler<ReplaceResult>[],
}

export const noHandlers: HandlerDict = {
    [ResultType.Capture]: [],
    [ResultType.EndTurn]: [],
    [ResultType.Move]: [],
    [ResultType.Promotion]: [],
    [ResultType.Replace]: [],
}