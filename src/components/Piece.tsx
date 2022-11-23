import styles from "../style/pieces.module.css"
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {PieceState} from "../rules/Types";
import {StateContext} from "./Game";

type PieceProps = {
};

export function Piece(props: PieceProps & PieceState) {
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

    const state = useContext(StateContext);

    function drag(e: React.MouseEvent | React.Touch) {
        setDragging(true);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        setDragX(e.clientX);
        setDragY(e.clientY);
    }

    function dragTouch(e: React.TouchEvent) {
        if (e.touches.length === 1) {
            drag(e.touches[0]);
        }
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
                if (validator(from, to, state)) {
                    move = true;
                    break;
                }
            }
            for (const validator of props.validatorsNeg) {
                if (validator(from, to, state)) {
                    move = false;
                    break;
                }
            }
            return move ? to : from;
        });
    }, [offsetY, offsetX, state, props.validatorsNeg, props.validatorsPos]);
    //TODO Maybe use reducer?

    useEffect(() => {
        function move(e: MouseEvent | Touch) {
            setDragX(e.clientX);
            setDragY(e.clientY);
        }

        function moveTouch(e: TouchEvent) {
            if (e.touches.length === 1) {
                move(e.touches[0]);
            }
        }

        if (dragging) {
            window.addEventListener("mousemove", move);
            window.addEventListener("touchmove", moveTouch);
            return () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("touchmove", moveTouch);
            };
        }
    }, [dragging]);

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mouseup", drop);
            window.addEventListener("touchend", drop);
            return () => {
                window.removeEventListener("mouseup", drop);
                window.removeEventListener("touchend", drop);
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
            onMouseDown={state.activeSide === props.color ? drag : undefined}
            onTouchStart={state.activeSide === props.color ? dragTouch : undefined}
            style={style}
        />
    );
}
