import styles from "../style/field.module.css"
import {ReactNode} from "react";

type FieldContainerProps = {
    children: ReactNode
}

function FieldContainer(props: FieldContainerProps) {
    return (
        <div className={styles.fieldContainer}>
            {props.children}
        </div>
    );
}

export default FieldContainer;
