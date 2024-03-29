import styles from "../../style/promotion.module.css"
import Field from "../core/Field";
import {StateUpdater} from "../../model/state";
import PieceSprite from "../core/PieceSprite";
import {Side, Square} from "../../model/types";
import Clickable from "../utility/Clickable";
import {ResultType} from "../../model/results";
import {GameRules} from "../../model/rules";
import {PieceType} from "../../rules/library";

type Props = {
    updateState: StateUpdater,
    square: Square,
    side: Side,
    rules: GameRules,
}

export default function Promotion(props: Props) {
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
                            side: props.side,
                            renderColor: props.side,
                            renderAs: properties.renderAs,
                            pieceType: type as PieceType,
                            validators: [...properties.validators],
                        }});
                }}>
                    <PieceSprite
                        renderColor={props.side}
                        renderAs={properties.renderAs}
                    />
                </Clickable>
            )}
        </Field>
    );
}
