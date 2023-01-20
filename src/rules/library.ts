import {std} from "./std/ruleset";

//TODO Create global list of namespaced piecetypes, etc.

export const library = {
    "std": std,
};

export type Package = keyof typeof library;