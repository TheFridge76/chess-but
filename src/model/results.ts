import {clonePiece, Side, Square} from "./types";
import {GameState} from "./state";

export enum ResultType {
    Move,
    Capture,
    EndTurn,
    Promotion,
}

function makeNewState(state: GameState, action: Result) {
    return {
        activeSide: state.activeSide,
        pieces: state.pieces,
        history: [...state.history, action],
    };
}

export class MoveResult implements Result {
    type = ResultType.Move;
    from: Square;
    to: Square;

    constructor(from: Square, to: Square) {
        this.from = from;
        this.to = to;
    }

    apply(state: GameState): GameState {
        const newState = makeNewState(state, this);
        newState.pieces = state.pieces.map((piece) => {
            const clone = clonePiece(piece);
            if (clone.row === this.from.row && clone.col === this.from.col) {
                clone.row = this.to.row;
                clone.col = this.to.col;
            }
            return clone;
        });
        return newState;
    }
}

export class CaptureResult implements Result {
    type = ResultType.Capture;
    on: Square;

    constructor(on: Square) {
        this.on = on;
    }

    apply(state: GameState): GameState {
        const newState = makeNewState(state, this);
        newState.pieces = state.pieces.filter((piece) => {
            return piece.row !== this.on.row || piece.col !== this.on.col;
        }).map((piece) => clonePiece(piece));
        return newState;
    }
}

export class EndTurnResult implements Result {
    type = ResultType.EndTurn;

    apply(state: GameState): GameState {
        const newState = makeNewState(state, this);
        switch (state.activeSide) {
            case Side.White:
                newState.activeSide = Side.Black;
                break;
            case Side.Black:
                newState.activeSide = Side.White;
                break;
        }
        return newState;
    }
}

export class PromotionResult implements Result {
    type = ResultType.Promotion;
    on: Square;

    constructor(on: Square) {
        this.on = on;
    }

    apply(state: GameState): GameState {
        const newState = makeNewState(state, this);
        console.log("Promoted!");
        return newState;
    }
}

export type Result = {
    type: ResultType,
    apply: (state: GameState) => GameState,
}