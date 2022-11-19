import {MoveValidator, Square} from "./Types";

export function flip(square: Square): Square {
    return {
        row: 9 - square.row,
        col: square.col,
    }
}

export function negate(validator: MoveValidator) {
    return (from: Square, to: Square, state: any) => {
        return !validator(from, to, state);
    };
}

export const always: MoveValidator = (from, to, state) => {
    return true;
}
export const onField: MoveValidator = (from, to, state) => {
    return (to.row >= 1 && to.row <= 8 && to.col >= 1 && to.col <= 8);
}