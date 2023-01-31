// Modifies a RuleSet by adding pieces, changing pieces, ...
// removePiece(PieceID)
// addHandler(Handler)
// removeHandler(HandlerID)?
// resetHandlers(ResultType)?
import {allPieces, allValidators, PieceType, ValidatorId} from "../rules/library";
import {GameRules} from "./rules";
import {Side} from "./types";

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

type AddValidatorProps = {
    id: ValidatorId,
    piece: PieceType,
    stage: number,
};
export const addValidator: RuleModifierTemplate<AddValidatorProps> = (props: AddValidatorProps) => {
    return (rules: GameRules) => {
        const entry = Object.entries(allValidators()).find(([type, _]) => type === props.id);
        if (entry === undefined) {
            console.error(`Could not find validator ${props.id}.`);
            return rules;
        }
        const piece = rules.pieces[props.piece];
        if (piece === undefined) {
            console.error(`Could not find piece ${props.piece}.`);
            return rules;
        }
        //TODO Put validator IDs into piece.validators so that this can be done better
        //TODO Also rework setup, such that in the setup, the overriden validators are used
        const oldValidators = piece.validators;
        piece.validators = (side: Side) => {
            console.log("Ran updated validators thingy");
            const validators = oldValidators(side);
            validators[props.stage].unshift(entry[1]);
            return validators;
        };
        return rules;
    }
}