import styles from "../style/pieces.module.css"
import React, {useContext, useEffect, useReducer} from "react";
import {TPiece, StateUpdater, GameState, MoveValidator} from "../rules/Types";
import {StateContext} from "./Game";

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

type PieceState = {
    dragging: boolean,
    dragStart: { x: number, y: number },
    dragPos: { x: number, y: number },
    square: { row: number, col: number },
};

function reducer(state: PieceState, action: {
    type: "drag" | "move" | "drop",
    payload: {
        e?: React.MouseEvent | MouseEvent | React.Touch | Touch,
        gameState?: GameState,
        validatorsPos?: MoveValidator[],
        validatorsNeg?: MoveValidator[],
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

            const gameState = action.payload.gameState as GameState;
            const validatorsPos = action.payload.validatorsPos as MoveValidator[];
            const validatorsNeg = action.payload.validatorsNeg as MoveValidator[];

            let move = false;
            for (const validator of validatorsPos) {
                if (validator(from, to, gameState)) {
                    move = true;
                    break;
                }
            }
            for (const validator of validatorsNeg) {
                if (validator(from, to, gameState)) {
                    move = false;
                    break;
                }
            }

            return {
                dragging: false,
                dragStart: {x: 0, y: 0},
                dragPos: {x: 0, y: 0},
                square: move
                    ? {row: to.row, col: to.col}
                    : {row: state.square.row, col: state.square.col},
            };
        default:
            return state;
    }
}

type PieceProps = {
    updateState: StateUpdater,
};

export function Piece(props: PieceProps & TPiece) {
    const gameState = useContext(StateContext);
    const [state, dispatch] = useReducer(reducer, {
        dragging: false,
        dragStart: {x: 0, y: 0},
        dragPos: {x: 0, y: 0},
        square: {row: props.row, col: props.col},
    });

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
            const drop = () => dispatch({
                type: "drop",
                payload: {
                    gameState: gameState,
                    validatorsPos: props.validatorsPos,
                    validatorsNeg: props.validatorsNeg,
                }
            });

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
    }, [state.dragging, gameState, props.validatorsPos, props.validatorsNeg]);

    const style = {
        top: getOffset(state).y,
        left: getOffset(state).x,
        gridRow: state.square.row,
        gridColumn: state.square.col,
    };

    return (
        <div
            className={`${styles.piece} ${styles[props.pieceType]} ${styles[props.color]} ${state.dragging ? styles.dragging : ""}`}
            onMouseDown={gameState.activeSide === props.color
                ? (e) => dispatch({type: "drag", payload: {e}})
                : undefined}
            onTouchStart={gameState.activeSide === props.color
                ? (e) => touchToMouse(e, (e) => dispatch({type: "drag", payload: {e}}))
                : undefined}
            style={style}
        />
    );
}
