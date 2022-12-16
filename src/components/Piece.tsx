import styles from "../style/pieces.module.css"
import React, {useContext, useEffect, useMemo, useReducer} from "react";
import {TPiece} from "../model/types";
import {StateContext} from "./Game";
import {MoveResult, Result, ResultType} from "../model/results";
import {GameState, StateUpdater} from "../model/state";
import {doMove, MoveValidator} from "../model/moves";

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
    updates: Result[],
};

function reducer(state: PieceState, action: {
    type: "drag" | "move" | "drop" | "clear",
    payload: {
        e?: React.MouseEvent | MouseEvent | React.Touch | Touch,
        gameState?: GameState,
        validators?: MoveValidator[],
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
                updates: state.updates,
            };
        case "move":
            const eMove = action.payload.e as React.MouseEvent | React.Touch;
            return {
                dragging: true,
                dragStart: {x: state.dragStart.x, y: state.dragStart.y},
                dragPos: {x: eMove.clientX, y: eMove.clientY},
                square: {row: state.square.row, col: state.square.col},
                updates: state.updates,
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
            const validators = action.payload.validators as MoveValidator[];

            const updates = doMove(from, to, gameState, validators);
            const move = updates.find((update) => update.type === ResultType.Move) as MoveResult;
            return {
                dragging: false,
                dragStart: {x: 0, y: 0},
                dragPos: {x: 0, y: 0},
                square: move !== undefined
                    ? {row: move.to.row, col: move.to.col}
                    : {row: state.square.row, col: state.square.col},
                updates: updates,
            };
        case "clear":
            if (state.updates.length === 0) {
                return state;
            }
            return {
                dragging: state.dragging,
                dragStart: state.dragStart,
                dragPos: state.dragPos,
                square: state.square,
                updates: [],
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
        updates: [],
    });
    const updateState = useMemo(() => props.updateState, [props.updateState]);

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
                    validators: props.validators,
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
    }, [state.dragging, gameState, props.validators]);

    useEffect(() => {
        for (const update of state.updates) {
            updateState(update);
        }
        dispatch({type: "clear", payload: {}});
    }, [state.updates, updateState]);

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
                : (e) => {e.preventDefault();}}
            onTouchStart={gameState.activeSide === props.color
                ? (e) => touchToMouse(e, (e) => dispatch({type: "drag", payload: {e}}))
                : (e) => {e.preventDefault();}}
            style={style}
        />
    );
}
