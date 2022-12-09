import {Piece} from "./Piece";
import Field from "./Field";
import {useContext} from "react";
import {StateContext} from "./Game";
import {TPiece} from "../model/types";
import {StateUpdater} from "../model/state";

function getKey(piece: TPiece) {
    return `${piece.col}_${piece.row}`;
}

type BoardProps = {
    updateState: StateUpdater,
}

function Board(props: BoardProps) {
    const state = useContext(StateContext);

    return (
        <Field>
            {state.pieces.map((piece) => {
                return <Piece
                    key={getKey(piece)}
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