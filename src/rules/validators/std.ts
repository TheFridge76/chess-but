import {sameSquare, Side, Square} from "../../model/types";
import {CaptureResult, EndTurnResult, MoveResult, ResultType} from "../../model/results";
import {attackedSquare, emptyPath, occupied, occupiedOpponent, standardMove} from "./util";
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

    const results = [new MoveResult(from, to), new MoveResult(partner, partnerTo), new EndTurnResult()];

    if (!emptyPath(from, partner, state)) {
        // Path from king to partner is not empty
        return [];
    }

    let newState = state;
    for (const result of results) {
        newState = result.apply(newState);
    }

    if (attackedSquare(from, from, state) || attackedSquare(from, partnerTo, state) || attackedSquare(to, to, newState)) {
        // Can't castle from, through or into check
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
    return results;
}

export const HolyHell: MoveValidator = (from, to, state) => {
    const {distX, distY} = getPawnDistance(from, to, state.activeSide);
    const passed = {
        row: from.row,
        col: to.col,
    };

    if (Math.abs(distX) !== 1 || distY !== 1) {
        // Have to move diagonally
        return [];
    }

    const passedPiece = state.pieces.find((piece) => sameSquare({row: piece.row, col: piece.col}, passed));
    if (passedPiece === undefined || passedPiece.pieceType !== "pawn") {
        // Can only en passant pawns :(
        return [];
    }

    const lastMove = state.history.reverse().find((result) => result.type === ResultType.Move) as MoveResult;
    // Reverse is in place, so we have to revert the reversing
    // TODO Get findLast to work
    state.history.reverse();

    if (!sameSquare(lastMove.to, passed)) {
        // Last move must be to the passed square
        return [];
    }

    if (lastMove.from.row !== 2 && lastMove.from.row !== 7) {
        // Last move must come from one of the starting pawn rows
        // Because pawns should only move in one direction, we don't care which one
        return [];
    }

    if (Math.abs(lastMove.from.row - lastMove.to.row) <= 1) {
        // Last move must have been at least two squares
        return [];
    }

    return [new CaptureResult(passed), new MoveResult(from, to), new EndTurnResult()];
}