import styles from "../style/promotion.module.css"
import Field from "./Field";
import {StateUpdater} from "../model/state";
import Piece from "./Piece";
import {Side} from "../model/types";

type PromotionProps = {
    updateState: StateUpdater,
}

function Promotion(props: PromotionProps) {
    // TODO Get promotion information in props
    return (
        <Field className={styles.background}>
            <h1 className={styles.header}>You got a promotion!</h1>
            <Piece
                color={Side.White}
                pieceType={"rook"}
            />
        </Field>
    );
}

export default Promotion;