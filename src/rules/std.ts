import {MoveValidator, Side} from "./Types";
import {flip} from "./util";

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

export const howDoesItMove: MoveValidator = (from, to, state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX === 2 && distY === 1) || (distX === 1 && distY === 2));
};

export const pawn: MoveValidator = (from, to, state) => {
    let virtualFrom;
    let virtualTo;
    switch (state.activeSide) {
        case Side.White:
            virtualFrom = from;
            virtualTo = to;
            break;
        case Side.Black:
            virtualFrom = flip(from);
            virtualTo = flip(to);
            break;
    }
    const distY = virtualTo.row - virtualFrom.row;
    const distX = Math.abs(virtualFrom.col - virtualTo.col);
    return ((distX === 0 && distY === 1) || (distX === 0 && distY === 2 && virtualFrom.row === 2));
}
