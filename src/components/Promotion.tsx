import styles from "../style/promotion.module.css"
import Field from "./Field";
import {StateUpdater} from "../model/state";

type PromotionProps = {
    updateState: StateUpdater,
}

function Promotion(props: PromotionProps) {
    return (
        <Field className={styles.background}>
            <h1 className={styles.header}>You got a promotion!</h1>
        </Field>
    );
}

export default Promotion;