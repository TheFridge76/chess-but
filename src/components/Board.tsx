import styles from "../style/field.module.css"
import {Color, Square} from "./Square";

function isLightSquare(i: number) {
    const column = i % 8;
    const row = Math.floor(i / 8);
    return column % 2 !== row % 2;
}

function Board() {
    return (
        <div className={`${styles.field}`}>
            {Array(64).fill(0).map((_, i) =>
                <Square color={isLightSquare(i) ? Color.Light : Color.Dark}/>)
            }
        </div>
    );
}

export default Board;