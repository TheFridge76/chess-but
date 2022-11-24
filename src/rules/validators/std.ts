import {MoveValidator, Side, Square, StandardMoveCondition} from "../types";
import {flip, occupied, occupiedOpponent, standardMove} from "./util";
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

function getPawnDistance(from: Square, to: Square, side: Side) {
    let virtualFrom;
    let virtualTo;
    switch (side) {
        case Side.White:
            virtualFrom = from;
            virtualTo = to;
            break;
        case Side.Black:
            virtualFrom = flip(from);
            virtualTo = flip(to);
            break;
    }
    return {
        distX: Math.abs(virtualFrom.col - virtualTo.col),
        distY: virtualTo.row - virtualFrom.row,
        virtualRow: virtualFrom.row,
    };
}

export const Pawn: MoveValidator = (from, to, state) => {
    const {distX, distY, virtualRow} = getPawnDistance(from, to, state.activeSide);
    const singleMove = (distX === 0 && distY === 1);
    const doubleMove = (distX === 0 && distY === 2 && virtualRow === 2);
    return (singleMove || doubleMove) && !occupied(from, to, state)
        ? [new MoveResult(from, to), new EndTurnResult()]
        : [];
}

export const PawnCapture: MoveValidator = (from, to, state) => {
    return standardMove((from, to, state) => {
        const {distX, distY} = getPawnDistance(from, to, state.activeSide);
        return (distX === 1 && distY === 1 && occupiedOpponent(from, to, state));
    })(from, to, state);
}
