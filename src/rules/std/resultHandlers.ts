import {
    CaptureResult,
    EndTurnResult,
    HandlerDict,
    MoveResult,
    PromotionResult,
    ReplaceResult,
    ResultHandler,
    ResultType
} from "../../model/results";
import {GamePhase, GameState, makeNewState} from "../../model/state";
import {clonePiece, Side} from "../../model/types";

const handleMove: ResultHandler<MoveResult> = (state, result) => {
    const newState = makeNewState(state, result);
    newState.pieces = state.pieces.map((piece) => {
        const clone = clonePiece(piece);
        if (clone.row === result.from.row && clone.col === result.from.col) {
            clone.row = result.to.row;
            clone.col = result.to.col;
        }
        return clone;
    });
    return newState;
};

const handleCapture: ResultHandler<CaptureResult> = (state, result) => {
    const newState = makeNewState(state, result);
    newState.pieces = state.pieces.filter((piece) => {
        return piece.row !== result.on.row || piece.col !== result.on.col;
    }).map((piece) => clonePiece(piece));
    return newState;
}

const handleEndTurn: ResultHandler<EndTurnResult> = (state, result) => {
    const newState = makeNewState(state, result);
    switch (state.activeSide) {
        case Side.White:
            newState.activeSide = Side.Black;
            break;
        case Side.Black:
            newState.activeSide = Side.White;
            break;
    }
    return newState;
}

const handlePromotion: ResultHandler<PromotionResult> = (state, result) => {
    const newState: GameState = makeNewState(state, result);
    newState.phase = {
        type: GamePhase.Promotion,
        data: {
            on: result.on,
            side: result.side,
        }
    }
    return newState;
}

const handleReplace: ResultHandler<ReplaceResult> = (state, result) => {
    const newState: GameState = makeNewState(state, result);
    newState.phase = {
        type: GamePhase.Turn,
        data: {},
    };
    // Remove old piece
    newState.pieces = state.pieces.filter((piece) => {
        return piece.row !== result.on.row || piece.col !== result.on.col;
    }).map((piece) => clonePiece(piece));
    // Insert new piece
    newState.pieces.push(result.piece);
    return newState;
}

export const handlers: HandlerDict = {
    [ResultType.Capture]: [handleCapture],
    [ResultType.EndTurn]: [handleEndTurn],
    [ResultType.Move]: [handleMove],
    [ResultType.Promotion]: [handlePromotion],
    [ResultType.Replace]: [handleReplace],
};