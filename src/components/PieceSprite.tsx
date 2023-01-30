import styles from "../style/pieces.module.css"
import {PieceStaticProps} from "../model/types";

type PieceProps = {};

export default function PieceSprite(props: PieceProps & PieceStaticProps) {
    return (
        <div className={`${styles.piece} ${styles[props.renderAs]} ${styles[props.color]}`}/>
    );
}