import {sameSquare, Side, Square} from "../../model/types";
import {CaptureResult, EndTurnResult, MoveResult, ResultType} from "../../model/results";
import {emptyPath, occupied, occupiedOpponent, standardMove} from "./util";
import {MoveCondition, MoveValidator} from "../../model/moves";

export const KingCondition: MoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX <= 1 && distY <= 1 && distX + distY > 0);
};

export const RookCondition: MoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX > 0 && distY === 0) || (distY > 0 && distX === 0));
};

export const BishopCondition: MoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return (distX === distY && distX !== 0);
};

export const HowDoesItMoveCondition: MoveCondition = (from, to, _state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    return ((distX === 2 && distY === 1) || (distX === 1 && distY === 2));
};

function flip(square: Square): Square {
    return {
        row: 9 - square.row,
        col: square.col,
    }
}

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
    return (singleMove || doubleMove) && !occupied(from, to, state) && emptyPath(from, to, state)
        ? [new MoveResult(from, to), new EndTurnResult()]
        : [];
}

export const PawnCapture: MoveValidator = (from, to, state) => {
    return standardMove((from, to, state) => {
        const {distX, distY} = getPawnDistance(from, to, state.activeSide);
        return (distX === 1 && distY === 1 && occupiedOpponent(from, to, state));
    })(from, to, state);
}

export const Castling: MoveValidator = (from, to, state) => {
    //TODO Cant move through check
    const short = {row: from.row, col: 8};
    const long = {row: from.row, col: 1};
    let partner: Square;
    const partnerTo = {
        row: from.row,
        col: from.col,
    };

    const colDiff = to.col - from.col;
    if (to.row - from.row !== 0) {
        // King moved from home row
        return [];
    } else if (colDiff === 2) {
        partner = short;
        partnerTo.col = 6;
    } else if (colDiff === -2) {
        partner = long;
        partnerTo.col = 4;
    } else {
        // King tried moving too far or too short
        return [];
    }

    if (!emptyPath(from, partner, state)) {
        // Path from king to partner is not empty
        return [];
    }

    for (const update of state.history) {
        switch (update.type) {
            case ResultType.Capture:
                const capture = update as CaptureResult;
                if (sameSquare(capture.on, partner)) {
                    // Partner piece was captured
                    return [];
                }
                break;
            case ResultType.Move:
                const move = update as MoveResult;
                if (sameSquare(move.from, partner)) {
                    // Partner piece has moved
                    return [];
                }
                if (sameSquare(move.to, from)) {
                    // Some piece moved to our square.
                    // This must mean, that the king left this square at some point.
                    return [];
                }
                break;
        }
    }
    return [new MoveResult(from, to), new MoveResult(partner, partnerTo), new EndTurnResult()];
}
