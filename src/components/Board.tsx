import styles from "../style/board.module.css"
import {Color, Square} from "./Square";
import Field from "./Field";

function isLightSquare(i: number) {
    const column = i % 8;
    const row = Math.floor(i / 8);
    return column % 2 !== row % 2;
}

function Board() {
    return (
        <Field>
            {Array(64).fill(0).map((_, i) =>
                <Square key={i} color={isLightSquare(i) ? Color.Light : Color.Dark}/>)
            }
        </Field>
    );
}

export default Board;