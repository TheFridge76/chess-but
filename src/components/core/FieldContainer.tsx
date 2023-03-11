import styles from "../../style/field.module.css"
import {ReactNode} from "react";

type Props = {
    children: ReactNode
}

export default function FieldContainer(props: Props) {
    return (
        <div className={styles.fieldContainer}>
            {props.children}
        </div>
    );
}
