import styles from "../style/promotion.module.css"
import Field from "./Field";
import {StateUpdater} from "../model/state";
import Piece from "./Piece";
import {PieceType, Side, Square} from "../model/types";
import Clickable from "./Clickable";
import {ResultType} from "../model/results";
import {GameRules} from "../model/rules";

type Props = {
    updateState: StateUpdater,
    square: Square,
    side: Side,
    rules: GameRules,
}

function Promotion(props: Props) {
    return (
        <Field className={styles.background}>
            <h1 className={styles.header}>You got a promotion!</h1>
            {Object.entries(props.rules.pieces).filter(([_, properties]) => properties.promotable).map(([type, properties]) =>
                <Clickable key={type} onClick={() => {
                    props.updateState({
                        type: ResultType.Replace,
                        on: {row: props.square.row, col: props.square.col},
                        piece: {
                            row: props.square.row,
                            col: props.square.col,
                            color: props.side,
                            pieceType: type as PieceType,
                            validators: properties.validators(props.side)
                        }});
                }}>
                    <Piece
                        color={props.side}
                        pieceType={type as PieceType}
                    />
                </Clickable>
            )}
        </Field>
    );
}

export default Promotion;