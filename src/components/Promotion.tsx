import styles from "../style/promotion.module.css"
import Field from "./Field";
import {StateUpdater} from "../model/state";
import Piece from "./Piece";
import {Side, Square} from "../model/types";
import Clickable from "./Clickable";
import {ReplaceResult} from "../model/results";

type PromotionProps = {
    updateState: StateUpdater,
    square: Square,
}

function Promotion(props: PromotionProps) {
    return (
        <Field className={styles.background}>
            <h1 className={styles.header}>You got a promotion!</h1>
            <Clickable onClick={() => {
                props.updateState(new ReplaceResult({row: props.square.row, col: props.square.col},
                    {row: props.square.row, col: props.square.col, color: Side.White, pieceType: "queen", validators: []}));
            }}>
                <Piece
                    color={Side.White}
                    pieceType={"queen"}
                />
            </Clickable>
        </Field>
    );
}

export default Promotion;