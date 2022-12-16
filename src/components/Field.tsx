import styles from "../style/field.module.css"
import {ReactNode} from "react";

type FieldProps = {
    children: ReactNode,
    className?: string,
}

function Field(props: FieldProps) {
    return (
        <div className={`${styles.field} ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Field;