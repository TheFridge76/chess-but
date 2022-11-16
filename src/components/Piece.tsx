import styles from "../style/pieces.module.css"

type PieceType = "pawn" | "rook" | "horsey" | "bishop" | "queen" | "king";
type Color = "black" | "white";

type PieceProps = {
    pieceType: PieceType,
    color: Color
};

export function Piece(props: PieceProps) {
    return (
        <div className={`${styles.piece} ${styles[props.pieceType]} ${styles[props.color]}`}>
        </div>
    );
}
