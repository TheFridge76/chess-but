// Modifies a RuleSet by adding pieces, changing pieces, ...
// addPiece(Piece)
// removePiece(PieceID)
// addValidator(PieceID, validator)
// addHandler(Handler)
// removeHandler(HandlerID)?
// resetHandlers(ResultType)?
import {allPieces, PieceType} from "../rules/library";
import {GameRules} from "./rules";

export type RuleModifier = (rules: GameRules) => GameRules;
type RuleModifierTemplate<T> = (val: T) => RuleModifier;

export const addPiece: RuleModifierTemplate<PieceType> = (piece: PieceType) => {
    return (rules: GameRules) => {
        const entry = Object.entries(allPieces()).find(([type, _]) => type === piece);
        if (entry === undefined) {
            console.error(`Could not find piece ${piece}.`);
            return rules;
        }
        rules.pieces[piece] = entry[1];
        return rules;
    };
}