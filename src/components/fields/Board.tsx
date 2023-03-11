import Square, {Color} from "../core/Square";
import Field from "../core/Field";

function isLightSquare(i: number) {
    const column = i % 8;
    const row = Math.floor(i / 8);
    return column % 2 !== row % 2;
}

export default function Board() {
    return (
        <Field>
            {Array(64).fill(0).map((_, i) =>
                <Square key={i} color={isLightSquare(i) ? Color.Light : Color.Dark}/>)
            }
        </Field>
    );
}
