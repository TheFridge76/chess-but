import {MoveValidator, Square, StandardMoveCondition} from "../types";
import {CaptureResult, EndTurnResult, MoveResult} from "../results";

export function flip(square: Square): Square {
    return {
        row: 9 - square.row,
        col: square.col,
    }
}

export const standardMove = (condition: StandardMoveCondition) => {
    const validator: MoveValidator = (from, to, state) => {
        if (condition(from, to, state)) {
            return [new CaptureResult(to), new MoveResult(from, to), new EndTurnResult()];
        }
        return [];
    };
    return validator;
};

export function negate(condition: StandardMoveCondition) {
    return (from: Square, to: Square, state: any) => {
        return !condition(from, to, state);
    };
}

export const always: StandardMoveCondition = (from, to, _state) => {
    return true;
}

export const onField: StandardMoveCondition = (from, to, _state) => {
    return (to.row >= 1 && to.row <= 8 && to.col >= 1 && to.col <= 8);
}

export const occupied: StandardMoveCondition = (_from, to, state) => {
    return state.pieces.find((piece) =>
        piece.row === to.row
        && piece.col === to.col
    ) !== undefined;
}

export const occupiedOpponent: StandardMoveCondition = (_from, to, state) => {
    return state.pieces.find((piece) =>
        piece.row === to.row
        && piece.col === to.col
        && piece.color !== state.activeSide
    ) !== undefined;
}
