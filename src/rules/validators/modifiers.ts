import {MoveCondition} from "../../model/types";

export function negate(condition: MoveCondition): MoveCondition {
    return (from, to, state) => {
        return !condition(from, to, state);
    };
}

export function every(...conditions: MoveCondition[]): MoveCondition {
    return (from, to, state) => {
        return conditions.every((condition) => condition(from, to, state));
    };
}

export function some(...conditions: MoveCondition[]): MoveCondition {
    return (from, to, state) => {
        return conditions.some((condition) => condition(from, to, state));
    };
}

export const always: MoveCondition = (from, to, _state) => {
    return true;
}