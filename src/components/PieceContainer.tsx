import {Piece} from "./Piece";
import Field from "./Field";
import {useContext} from "react";
import {StateContext} from "./Game";

function Board() {
    const state = useContext(StateContext);

    return (
        <Field>
            {state.pieces.map((piece) => {
                return <Piece
                    row={piece.row}
                    col={piece.col}
                    color={piece.color}
                    pieceType={piece.pieceType}
                    validatorsPos={piece.validatorsPos}
                    validatorsNeg={piece.validatorsNeg}
                />
            })}
        </Field>
    );
}

export default Board;