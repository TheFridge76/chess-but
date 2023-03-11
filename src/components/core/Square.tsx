import styles from "../../style/board.module.css"

export enum Color {
    Dark,
    Light
}

type Props = {
    color: Color
};

export default function Square(props: Props) {
    let colorClass;
    switch (props.color) {
        case Color.Dark:
            colorClass = styles.dark;
            break;
        case Color.Light:
            colorClass = styles.light;
            break;
    }

    return (
        <div className={`${styles.square} ${colorClass}`}/>
    );
}
