import styles from "../../style/field.module.css"
import {ReactNode} from "react";

type Props = {
    children: ReactNode,
    className?: string,
}

export default function Field(props: Props) {
    return (
        <div className={`${styles.field} ${props.className}`}>
            {props.children}
        </div>
    );
}
