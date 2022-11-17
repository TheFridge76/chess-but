import styles from "../style/pieces.module.css"
import React, {useCallback, useEffect, useMemo, useState} from "react";

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
    const offsetX = useMemo(() => dragX - dragStartX, [dragX, dragStartX]);
    const offsetY = useMemo(() => dragY - dragStartY, [dragY, dragStartY]);
    const [row, setRow] = useState(props.row);
    const [col, setCol] = useState(props.col);

    function drag(e: React.MouseEvent) {
        setDragging(true);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        setDragX(e.clientX);
        setDragY(e.clientY);
    }

    function move(e: MouseEvent) {
        setDragX(e.clientX);
        setDragY(e.clientY);
    }

    const drop = useCallback(() => {
        setDragging(false);
        setRow(row => row + Math.round(offsetY / 81));
        setCol(col => col + Math.round(offsetX / 81));
    }, [offsetY, offsetX]);

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", move);
            return () => {
                window.removeEventListener("mousemove", move);
            };
        }
    }, [dragging]);

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mouseup", drop);
            return () => {
                window.removeEventListener("mouseup", drop);
            };
        }
    }, [dragging, drop]);

    const style= {
        top: offsetY,
        left: offsetX,
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
