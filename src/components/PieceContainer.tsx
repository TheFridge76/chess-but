import Piece from "./Piece";
import Field from "./Field";
import {useContext} from "react";
import {StateContext} from "./Game";
import {TPiece} from "../model/types";
import {StateUpdater} from "../model/state";
import {Draggable} from "./Draggable";
import {doMove} from "../model/moves";
import {MoveResult, ResultType} from "../model/results";

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
                return <Draggable key={getKey(piece)}
                                  active={state.activeSide === piece.color} row={piece.row} col={piece.col}
                                  dropValidator={(from, to) => {
                                      const updates = doMove(from, to, state, piece.validators);
                                      const move = updates.find((update) => update.type === ResultType.Move) as MoveResult;
                                      return move ? move.to : from;
                                  }}
                                  onDrop={(from, to) => {
                                      const updates = doMove(from, to, state, piece.validators);
                                      for (const update of updates) {
                                          props.updateState(update);
                                      }
                                  }}>
                    <Piece
                        color={piece.color}
                        pieceType={piece.pieceType}
                    />
                </Draggable>
            })}
        </Field>
    );
}

export default Board;