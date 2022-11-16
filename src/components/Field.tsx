import styles from "../style/field.module.css"
import {ReactNode} from "react";

type FieldProps = {
    children: ReactNode
}

function Field(props: FieldProps) {
    return (
        <div className={`${styles.field}`}>
            {props.children}
        </div>
    );
}

export default Field;