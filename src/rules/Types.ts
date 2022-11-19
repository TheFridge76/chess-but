export type Square = {
    row: number,
    col: number,
}

enum ResultType {
    Move,
    Capture,
    EndTurn,
}

export enum Side {
    White = "white",
    Black = "black",
}

export type GameState = {
    activeSide: Side,
}

//TODO Include actual result in return value
export type MoveValidator = (from: Square, to: Square, state: GameState) => boolean;
