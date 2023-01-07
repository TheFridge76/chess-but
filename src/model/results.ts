import {Side, Square, TPiece} from "./types";
import {GameState} from "./state";

export enum ResultType {
    Move,
    Capture,
    EndTurn,
    Promotion,
    Replace,
}

export type ResultHandler<T extends Result> = (state: GameState, result: T) => GameState;

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
    piece: TPiece,
}

export type Result = MoveResult | CaptureResult | EndTurnResult | PromotionResult | ReplaceResult;