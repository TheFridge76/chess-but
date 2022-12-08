import {Square} from "./types";

export enum ResultType {
    Move,
    Capture,
    EndTurn,
}

export class MoveResult {
    type: ResultType;
    from: Square;
    to: Square;

    constructor(from: Square, to: Square) {
        this.type = ResultType.Move;
        this.from = from;
        this.to = to;
    }
}

export class CaptureResult {
    type: ResultType;
    on: Square;

    constructor(on: Square) {
        this.type = ResultType.Capture;
        this.on = on;
    }
}

export class EndTurnResult {
    type: ResultType;

    constructor() {
        this.type = ResultType.EndTurn;
    }
}

export type Result = {
    type: ResultType,
}