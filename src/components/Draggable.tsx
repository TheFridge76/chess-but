import styles from "../style/draggable.module.css"
import React, {ReactNode, useEffect, useReducer} from "react";
import {Square} from "../model/types";

function touchToMouse(e: React.TouchEvent | TouchEvent, handler: (e: React.Touch | Touch) => void) {
    if (e.touches.length === 1) {
        handler(e.touches[0]);
    }
}

function getOffset(state: PieceState) {
    return {
        x: state.dragPos.x - state.dragStart.x,
        y: state.dragPos.y - state.dragStart.y,
    };
}

export type DropValidator = (from: Square, to: Square) => Square;

type PieceState = {
    dragging: boolean,
    dragStart: { x: number, y: number },
    dragPos: { x: number, y: number },
    square: Square,
    dropped?: { from: Square, to: Square },
};

function reducer(state: PieceState, action: {
    type: "drag" | "move" | "drop" | "clear",
    payload: {
        e?: React.MouseEvent | MouseEvent | React.Touch | Touch,
        dropValidator?: DropValidator,
    },
}) {
    switch (action.type) {
        case "drag":
            const eDrag = action.payload.e as React.MouseEvent | React.Touch;
            return {
                dragging: true,
                dragStart: {x: eDrag.clientX, y: eDrag.clientY},
                dragPos: {x: eDrag.clientX, y: eDrag.clientY},
                square: {row: state.square.row, col: state.square.col},
            };
        case "move":
            const eMove = action.payload.e as React.MouseEvent | React.Touch;
            return {
                dragging: true,
                dragStart: {x: state.dragStart.x, y: state.dragStart.y},
                dragPos: {x: eMove.clientX, y: eMove.clientY},
                square: {row: state.square.row, col: state.square.col},
            };
        case "drop":
            const offset = getOffset(state);
            const from = {
                row: state.square.row,
                col: state.square.col,
            }
            const to = {
                row: from.row + Math.round(offset.y / 80),
                col: from.col + Math.round(offset.x / 80),
            };

            const validator = action.payload.dropValidator as DropValidator;
            const move = validator(from, to);

            return {
                dragging: false,
                dragStart: {x: 0, y: 0},
                dragPos: {x: 0, y: 0},
                square: {row: move.row, col: move.col},
                dropped: {from, to},
            };
        case "clear":
            if (!state.dropped) {
                return state;
            }
            return {
                dragging: state.dragging,
                dragStart: state.dragStart,
                dragPos: state.dragPos,
                square: state.square,
            };
        default:
            return state;
    }
}

type DraggableProps = {
    children: ReactNode,
    active: boolean,
    row: number,
    col: number,
    dropValidator: DropValidator,
    onDrop: (from: Square, to: Square) => void,
};

export function Draggable(props: DraggableProps) {
    const [state, dispatch] = useReducer(reducer, {
        dragging: false,
        dragStart: {x: 0, y: 0},
        dragPos: {x: 0, y: 0},
        square: {row: props.row, col: props.col},
    });
    const onDrop = props.onDrop;
    const dropValidator = props.dropValidator;

    useEffect(() => {
        if (state.dragging) {
            const move = (e: MouseEvent) => {
                e.preventDefault();
                dispatch({type: "move", payload: {e: e}});
            };
            const moveTouch = (e: TouchEvent) => {
                e.preventDefault();
                touchToMouse(e, (e) => dispatch({type: "move", payload: {e: e}}));
            }
            const drop = () => dispatch({type: "drop", payload: {dropValidator: dropValidator}});

            window.addEventListener("mousemove", move);
            window.addEventListener("touchmove", moveTouch);
            window.addEventListener("mouseup", drop);
            window.addEventListener("touchend", drop);
            return () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("touchmove", moveTouch);
                window.removeEventListener("mouseup", drop);
                window.removeEventListener("touchend", drop);
            };
        }
    }, [state.dragging, dropValidator]);

    useEffect(() => {
        if (state.dropped) {
            onDrop(state.dropped.from, state.dropped.to);
            dispatch({type: "clear", payload: {}});
        }
    }, [state.dropped, onDrop]);

    const style = {
        top: getOffset(state).y,
        left: getOffset(state).x,
        gridRow: state.square.row,
        gridColumn: state.square.col,
    };

    return (
        <div
            className={`${state.dragging ? styles.dragging : ""}`}
            onMouseDown={props.active
                ? (e) => dispatch({type: "drag", payload: {e}})
                : (e) => {e.preventDefault();}}
            onTouchStart={props.active
                ? (e) => touchToMouse(e, (e) => dispatch({type: "drag", payload: {e}}))
                : (e) => {e.preventDefault();}}
            style={style}
        >
            {props.children}
        </div>
    );
}
