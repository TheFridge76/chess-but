import {Result, ResultType} from "../../model/results";
import {doMove, MoveCondition, MoveValidator} from "../../model/moves";
import {always} from "./modifiers";
import {sameSquare, Side} from "../../model/types";
import {updateState} from "../../model/state";

export const standardMove = (condition: MoveCondition) => {
    const validator: MoveValidator = (from, to, state) => {
        if (condition(from, to, state)) {
            const results: Result[] = [{
                type: ResultType.Move,
                from: from,
                to: to,
            }, {
                type: ResultType.EndTurn,
            }];
            if (occupiedOpponent(from, to, state)) {
                results.unshift({
                    type: ResultType.Capture,
                    on: to,
                });
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
        // We don't want to handle this, so just let it pass ??\_(???)_/??
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

export const activeSide = (side: Side): MoveCondition => {
    return (_from, _to, state) => {
        return state.activeSide === side;
    };
}

// TODO Create function that returns an attackedSquare function for a given side
export const attackedSquare: MoveCondition = (from, to, state) => {
    const updates = standardMove(always)(from, to, state);
    let newState = state;
    for (const update of updates) {
        newState = updateState(newState, update);
    }
    for (const piece of newState.pieces) {
        const validators = piece.validators;

        const possibleUpdates = doMove({row: piece.row, col: piece.col}, to, newState, validators);
        if (possibleUpdates.findIndex((update) => update.type === ResultType.Capture) !== -1) {
            return true;
        }
    }
    return false;
}

export const kingAttacked: MoveCondition = (from, to, state) => {
    const king = state.pieces.find((piece) => piece.pieceType === "king" && piece.color === state.activeSide);
    if (king === undefined) {
        return false;
    }

    const piece = state.pieces.find((piece) => sameSquare({row: piece.row, col: piece.col}, from));
    if (piece === undefined) {
        return false;
    }

    let newState = state;
    const attemptedUpdates = doMove(from, to, newState, piece.validators);
    if (attemptedUpdates.length === 0) {
        return false;
    }

    for (const update of attemptedUpdates) {
        if (update.type !== ResultType.EndTurn) {
            newState = updateState(newState, update);
        }
    }

    const kingSquare = {row: king.row, col: king.col};
    return attackedSquare(kingSquare, kingSquare, newState);
}