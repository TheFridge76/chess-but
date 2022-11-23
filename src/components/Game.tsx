import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React, {useCallback, useMemo, useState} from "react";
import {GameState, Result, ResultType, Side} from "../rules/Types";
import {defaultPieces} from "../rules/setup/std";

export const StateContext = React.createContext<GameState>({
    activeSide: Side.White,
    pieces: [],
});

export default function Game() {
    const [activeSide, setActiveSide] = useState(Side.White);
    const [pieces/*, setPieces*/] = useState(defaultPieces());

    const state = useMemo(() => {
        return {
            activeSide: activeSide,
            pieces: pieces,
        };
    }, [activeSide, pieces]);

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
        }
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