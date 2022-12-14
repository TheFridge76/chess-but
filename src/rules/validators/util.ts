import {CaptureResult, EndTurnResult, MoveResult} from "../../model/results";
import {MoveCondition, MoveValidator} from "../../model/moves";

export const standardMove = (condition: MoveCondition) => {
    const validator: MoveValidator = (from, to, state) => {
        if (condition(from, to, state)) {
            const results = [new MoveResult(from, to), new EndTurnResult()];
            if (occupiedOpponent(from, to, state)) {
                results.unshift(new CaptureResult(to));
            }
            return results;
        }
        return [];
    };
    return validator;
};

export const onField: MoveCondition = (from, to, _state) => {
    return (to.row >= 1 && to.row <= 8 && to.col >= 1 && to.col <= 8);
}

export const occupied: MoveCondition = (_from, to, state) => {
    return state.pieces.find((piece) =>
        piece.row === to.row
        && piece.col === to.col
    ) !== undefined;
}

export const occupiedOpponent: MoveCondition = (_from, to, state) => {
    return state.pieces.find((piece) =>
        piece.row === to.row
        && piece.col === to.col
        && piece.color !== state.activeSide
    ) !== undefined;
}

export const occupiedAlly: MoveCondition = (_from, to, state) => {
    return state.pieces.find((piece) =>
        piece.row === to.row
        && piece.col === to.col
        && piece.color === state.activeSide
    ) !== undefined;
}

export const emptyPath: MoveCondition = (from, to, state) => {
    const diffRow = (to.row - from.row);
    const diffCol = (to.col - from.col);
    if (diffRow !== 0 && diffCol !== 0 && Math.abs(diffRow) !== Math.abs(diffCol)) {
        // Path is neither straight, nor diagonal.
        // We don't want to handle this, so just let it pass ¯\_(ツ)_/¯
        return true;
    }
    const incRow = Math.max(Math.min(diffRow, 1), -1);
    const incCol = Math.max(Math.min(diffCol, 1), -1);
    let square = {
        row: from.row + incRow,
        col: from.col + incCol,
    }
    while (square.row !== to.row || square.col !== to.col) {
        if (occupied(square, square, state)) {
            return false;
        }
        square.row += incRow;
        square.col += incCol;
    }
    return true;
}