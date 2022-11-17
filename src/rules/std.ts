import {MoveValidator, Square} from "./Types";

export function negate(validator: MoveValidator) {
    return (from: Square, to: Square, state: any) => {
        return !validator(from, to, state);
    };
}

export const always: MoveValidator = (from: Square, to: Square, state: any) => {
    return true;
}

export const onField: MoveValidator = (from: Square, to: Square, state: any) => {
    return (to.row >= 1 && to.row <= 8 && to.col >= 1 && to.col <= 8);
}

//TODO Prevent moving through pieces

export const king: MoveValidator = (from: Square, to: Square, state: any) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX <= 1 && distY <= 1 && distX + distY > 0);
};

export const rook: MoveValidator = (from: Square, to: Square, state: any) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX > 0 && distY === 0) || (distY > 0 && distX === 0));
};

export const bishop: MoveValidator = (from: Square, to: Square, state: any) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX === distY && distX !== 0);
};

export const queen: MoveValidator = (from: Square, to: Square, state: any) => {
    return (rook(from, to, state) || bishop(from, to, state));
};
