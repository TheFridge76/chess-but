import {GameState} from "./state";
import {Result} from "./results";
import {Square} from "./types";

export type MoveCondition = (from: Square, to: Square, state: GameState) => boolean;
type MoveConditionReturn = ReturnType<MoveCondition>;
export type MoveExecutor = (from: Square, to: Square, state: GameState) => Result[];
type MoveExecutorReturn = ReturnType<MoveExecutor>;
export type MoveValidator = MoveCondition | MoveExecutor;

function isConditionReturn(result: MoveConditionReturn | MoveExecutorReturn): result is MoveConditionReturn {
    return typeof result === 'boolean';
}

let recursionDepth = 0;
export function doMove(from: Square, to: Square, state: GameState,
                       validators: MoveValidator[], maxRecursion: number = 1): Result[] {
    if (recursionDepth++ > maxRecursion) {
        recursionDepth--;
        return [];
    }
    let updates = [];
    for (let validator of validators) {
        const results = validator(from, to, state);
        if (isConditionReturn(results)) {
            if (!results) {
                updates = [];
                break;
            }
        } else {
            if (results.length > 0) {
                updates.push(...results);
            }
        }
    }
    recursionDepth--;
    return updates;
}