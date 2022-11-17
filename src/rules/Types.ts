export type Square = {
    row: number,
    col: number,
}

enum ResultType {
    Move,
    Capture,
    EndTurn,
}

//TODO Include actual result in return value
export type MoveValidator = (from: Square, to: Square, state: any) => boolean;
