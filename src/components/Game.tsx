import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React, {useCallback, useMemo, useState} from "react";
import {GameState, Side} from "../rules/types";
import {defaultPieces} from "../rules/setup/std";
import {CaptureResult, MoveResult, Result, ResultType} from "../rules/results";

export const StateContext = React.createContext<GameState>({
    activeSide: Side.White,
    pieces: [],
    history: [],
});

export default function Game() {
    const [activeSide, setActiveSide] = useState(Side.White);
    const [pieces, setPieces] = useState(defaultPieces());
    const [history, setHistory] = useState<Result[]>([]);

    const state = useMemo(() => {
        return {
            activeSide: activeSide,
            pieces: pieces,
            history: history,
        };
    }, [activeSide, pieces, history]);

    const updateState = useCallback((update: Result) => {
        switch (update.type) {
            case ResultType.EndTurn:
                setActiveSide((side) => {
                    let newSide;
                    switch (side) {
                        case Side.White:
                            newSide = Side.Black;
                            break;
                        case Side.Black:
                            newSide = Side.White;
                            break;
                    }
                    return newSide;
                });
                break;
            case ResultType.Move:
                setPieces((pieces) => {
                    const move = update as MoveResult;
                    const newPieces = [...pieces];
                    newPieces.forEach((piece) => {
                        if (piece.row === move.from.row && piece.col === move.from.col) {
                            piece.row = move.to.row;
                            piece.col = move.to.col;
                        }
                    });
                    return newPieces;
                });
                break;
            case ResultType.Capture:
                setPieces((pieces) => {
                    const capture = update as CaptureResult;
                    return pieces.filter((piece) => {
                        return piece.row !== capture.on.row || piece.col !== capture.on.col;
                    });
                });
                break;
        }
        setHistory((history) => [...history, update]);
    }, []);

    return (
        <StateContext.Provider value={state}>
            <FieldContainer>
                <Board/>
                <PieceContainer updateState={updateState}/>
            </FieldContainer>
        </StateContext.Provider>
    );
}