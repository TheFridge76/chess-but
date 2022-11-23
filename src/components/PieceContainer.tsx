import {Piece} from "./Piece";
import Field from "./Field";
import {useContext} from "react";
import {StateContext} from "./Game";
import {StateUpdater} from "../rules/Types";

type BoardProps = {
    updateState: StateUpdater,
}

function Board(props: BoardProps) {
    const state = useContext(StateContext);

    return (
        <Field>
            {state.pieces.map((piece, index) => {
                return <Piece
                    key={index}
                    row={piece.row}
                    col={piece.col}
                    color={piece.color}
                    pieceType={piece.pieceType}
                    validatorsPos={piece.validatorsPos}
                    validatorsNeg={piece.validatorsNeg}
                    updateState={props.updateState}
                />
            })}
        </Field>
    );
}

export default Board;