import {clonePiece, Side, Square, TPiece} from "./types";
import {GamePhase, GameState} from "./state";

export enum ResultType {
    Move,
    Capture,
    EndTurn,
    Promotion,
    Replace,
}

function makeNewState(state: GameState, action: Result) {
    return {
        activeSide: state.activeSide,
        phase: structuredClone(state.phase),
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
        newState.phase.type = GamePhase.Promotion;
        newState.phase.data.on = this.on;
        return newState;
    }
}

export class ReplaceResult implements Result {
    type = ResultType.Replace;
    on: Square;
    piece: TPiece;

    constructor(on: Square, piece: TPiece) {
        this.on = on;
        this.piece = piece;
    }

    apply(state: GameState): GameState {
        const newState = makeNewState(state, this);
        newState.phase = GamePhase.Turn;
        // Remove old piece
        newState.pieces = state.pieces.filter((piece) => {
            return piece.row !== this.on.row || piece.col !== this.on.col;
        }).map((piece) => clonePiece(piece));
        // Insert new piece
        newState.pieces.push(this.piece);
        return newState;
    }
}

export type Result = {
    type: ResultType,
    apply: (state: GameState) => GameState,
}