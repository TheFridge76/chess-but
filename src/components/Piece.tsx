import styles from "../style/pieces.module.css"
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {MoveValidator, Side} from "../rules/Types";

export type PieceType = "pawn" | "rook" | "horsey" | "bishop" | "queen" | "king";

type PieceProps = {
    pieceType: PieceType,
    color: Side,
    row: number,
    col: number,
    validatorsPos: MoveValidator[],
    validatorsNeg: MoveValidator[],
};

export function Piece(props: PieceProps) {
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragY, setDragY] = useState(0);
    const offsetX = useMemo(() => dragX - dragStartX, [dragX, dragStartX]);
    const offsetY = useMemo(() => dragY - dragStartY, [dragY, dragStartY]);
    const [square, setSquare] = useState({
        row: props.row,
        col: props.col,
    });

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
        setSquare((from) => {
            const to = {
                row: from.row + Math.round(offsetY / 81),
                col: from.col + Math.round(offsetX / 81),
            };
            let move = false;
            for (const validator of props.validatorsPos) {
                if (validator(from, to, {activeSide: props.color})) {
                    move = true;
                    break;
                }
            }
            for (const validator of props.validatorsNeg) {
                if (validator(from, to, {activeSide: props.color})) {
                    move = false;
                    break;
                }
            }
            return move ? to : from;
        });
    }, [offsetY, offsetX, props.color, props.validatorsNeg, props.validatorsPos]);
    //TODO Maybe use reducer?

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
        gridRow: square.row,
        gridColumn: square.col,
    };

    return (
        <div
            className={`${styles.piece} ${styles[props.pieceType]} ${styles[props.color]} ${dragging ? styles.dragging : ""}`}
            onMouseDown={drag}
            style={style}
        />
    );
}
