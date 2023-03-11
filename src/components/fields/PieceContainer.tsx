import PieceSprite from "../core/PieceSprite";
import Field from "../core/Field";
import {useContext} from "react";
import {StateContext} from "../core/Game";
import {Side, Piece} from "../../model/types";
import {StateUpdater} from "../../model/state";
import Draggable from "../utility/Draggable";
import {doMove} from "../../model/moves";
import {MoveResult, ResultType} from "../../model/results";
import {GameRules} from "../../model/rules";

function getKey(piece: Piece) {
    return `${piece.col}_${piece.row}`;
}

type Props = {
    updateState: StateUpdater,
    rules: GameRules,
}

export default function PieceContainer(props: Props) {
    const state = useContext(StateContext);

    function isActive(color: Side) {
        return state.activeSide === color
            && props.rules.playableSides.find((s) => s === state.activeSide) !== undefined;
    }

    return (
        <Field>
            {state.pieces.map((piece) => {
                return <Draggable key={getKey(piece)}
                                  active={isActive(piece.side)} row={piece.row} col={piece.col}
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
                    <PieceSprite
                        renderColor={piece.renderColor}
                        renderAs={piece.renderAs}
                    />
                </Draggable>
            })}
        </Field>
    );
}
