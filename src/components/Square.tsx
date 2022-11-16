import styles from "../style/board.module.css"

export enum Color {
    Dark,
    Light
}

type SquareProps = {
    color: Color
};

export function Square(props: SquareProps) {
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
        <div className={`${styles.square} ${colorClass}`}>
        </div>
    );
}
