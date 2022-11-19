import {Piece, PieceType} from "./Piece";
import Field from "./Field";
import {bishop, howDoesItMove, king, pawn, queen, rook} from "../rules/std";
import {MoveValidator, Side} from "../rules/Types";
import {negate, onField} from "../rules/util";

function Board() {
    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    function getValidatorsPos(piece: PieceType) {
        const validatorsPos: MoveValidator[] = [];
        switch(piece) {
            case "horsey":
                validatorsPos.push(howDoesItMove);
                break;
            case "bishop":
                validatorsPos.push(bishop);
                break;
            case "king":
                validatorsPos.push(king);
                break;
            case "pawn":
                validatorsPos.push(pawn);
                break;
            case "queen":
                validatorsPos.push(queen);
                break;
            case "rook":
                validatorsPos.push(rook);
                break;
        }
        return validatorsPos;
    }

    return (
        <Field>
            {backRow.map((piece, index) => {
                const validatorsPos = getValidatorsPos(piece);
                return <Piece key={index} row={1} col={index + 1} color={Side.White} pieceType={piece}
                       validatorsPos={validatorsPos}
                       validatorsNeg={[negate(onField)]}
                />;
            })}
            {frontRow.map((piece, index) => {
                const validatorsPos = getValidatorsPos(piece);
                return <Piece key={index} row={2} col={index + 1} color={Side.White} pieceType={piece}
                              validatorsPos={validatorsPos}
                              validatorsNeg={[negate(onField)]}
                />;
            })}
            {backRow.map((piece, index) => {
                const validatorsPos = getValidatorsPos(piece);
                return <Piece key={index} row={8} col={index + 1} color={Side.Black} pieceType={piece}
                              validatorsPos={validatorsPos}
                              validatorsNeg={[negate(onField)]}
                />;
            })}
            {frontRow.map((piece, index) => {
                const validatorsPos = getValidatorsPos(piece);
                return <Piece key={index} row={7} col={index + 1} color={Side.Black} pieceType={piece}
                              validatorsPos={validatorsPos}
                              validatorsNeg={[negate(onField)]}
                />;
            })}
        </Field>
    );
}

export default Board;