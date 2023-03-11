import styles from "../../style/pieces.module.css"
import {Piece} from "../../model/types";

type Props = Pick<Piece, "renderAs" | "renderColor">;

export default function PieceSprite(props: Props) {
    return (
        <div className={`${styles.piece} ${styles[props.renderAs]} ${styles[props.renderColor]}`}/>
    );
}