import {MoveValidator} from "./Types";

//TODO Prevent moving through pieces

export const king: MoveValidator = (from, to, state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX <= 1 && distY <= 1 && distX + distY > 0);
};

export const rook: MoveValidator = (from, to, state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX > 0 && distY === 0) || (distY > 0 && distX === 0));
};

export const bishop: MoveValidator = (from, to, state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX === distY && distX !== 0);
};

export const queen: MoveValidator = (from, to, state) => {
    return (rook(from, to, state) || bishop(from, to, state));
};
