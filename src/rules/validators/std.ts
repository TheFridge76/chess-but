import {MoveValidator, Side, StandardMoveCondition} from "../types";
import {flip, standardMove} from "./util";
import {EndTurnResult, MoveResult} from "../results";

//TODO Prevent moving through pieces

export const KingCondition: StandardMoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX <= 1 && distY <= 1 && distX + distY > 0);
};

export const King: MoveValidator = (from, to, _state) => {
    return standardMove(KingCondition)(from, to, _state);
};

export const RookCondition: StandardMoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX > 0 && distY === 0) || (distY > 0 && distX === 0));
};

export const Rook: MoveValidator = (from, to, _state) => {
    return standardMove(RookCondition)(from, to, _state);
};

export const BishopCondition: StandardMoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX === distY && distX !== 0);
};

export const Bishop: MoveValidator = (from, to, _state) => {
    return standardMove(BishopCondition)(from, to, _state);
};

export const Queen: MoveValidator = (from, to, state) => {
    return standardMove((from, to, state) => {
        return BishopCondition(from, to, state) || RookCondition(from, to, state);
    })(from, to, state);
};

export const HowDoesItMoveCondition: StandardMoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX === 2 && distY === 1) || (distX === 1 && distY === 2));
};

export const HowDoesItMove: MoveValidator = (from, to, _state) => {
    return standardMove(HowDoesItMoveCondition)(from, to, _state);
};

export const Pawn: MoveValidator = (from, to, state) => {
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
    return ((distX === 0 && distY === 1) || (distX === 0 && distY === 2 && virtualFrom.row === 2))
        ? [new MoveResult(from, to), new EndTurnResult()]
        : [];
}
