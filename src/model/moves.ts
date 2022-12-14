import {GameState} from "./state";
import {Result} from "./results";
import {Square} from "./types";

export type MoveCondition = (from: Square, to: Square, state: GameState) => boolean;
export type MoveValidator = (from: Square, to: Square, state: GameState) => Result[];

export function doMove(from: Square, to: Square, state: GameState,
                       validatorsPos: MoveValidator[], validatorsNeg: MoveCondition[]): Result[] {
    let updates = [];
    for (const validator of validatorsPos) {
        const results = validator(from, to, state);
        if (results.length > 0) {
            updates.push(...results);
            break;
        }
    }
    for (const validator of validatorsNeg) {
        if (validator(from, to, state)) {
            updates = [];
            break;
        }
    }
    return updates;
}