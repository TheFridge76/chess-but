import styles from "../style/pieces.module.css"
import {TPieceStatic} from "../model/types";

type PieceProps = {};

export default function Piece(props: PieceProps & TPieceStatic) {
    return (
        <div className={`${styles.piece} ${styles[props.pieceType]} ${styles[props.color]}`}/>
    );
}