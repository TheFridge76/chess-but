import styles from "../style/pieces.module.css"
import React, {useEffect, useState} from "react";

type PieceType = "pawn" | "rook" | "horsey" | "bishop" | "queen" | "king";
type Color = "black" | "white";

type PieceProps = {
    pieceType: PieceType,
    color: Color,
    row: number,
    col: number,
};

export function Piece(props: PieceProps) {
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragY, setDragY] = useState(0);
    const [row, setRow] = useState(props.row);
    const [col, setCol] = useState(props.col);

    function move(e: MouseEvent) {
        setDragX(e.clientX);
        setDragY(e.clientY);
    }

    function drag(e: React.MouseEvent) {
        setDragging(true);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        setDragX(e.clientX);
        setDragY(e.clientY);
    }

    function drop() {
        setDragging(false);
    }

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", drop);
            return () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", drop);
            };
        } else {
            setRow(row => row + Math.round((dragY - dragStartY) / 81));
            setCol(col => col + Math.round((dragX - dragStartX) / 81));
        }
    }, [dragging]);

    const style= {
        left: dragX - dragStartX,
        top: dragY - dragStartY,
        gridRow: row,
        gridColumn: col,
    };

    return (
        <div
            className={`${styles.piece} ${styles[props.pieceType]} ${styles[props.color]} ${dragging ? styles.dragging : ""}`}
            onMouseDown={drag}
            style={style}
        />
    );
}
