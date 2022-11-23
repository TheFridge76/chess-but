import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React, {useMemo, useState} from "react";
import {GameState, Side} from "../rules/Types";
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

    function updateState() {
        let newSide: Side;
        switch (state.activeSide) {
            case Side.White:
                newSide = Side.Black;
                break;
            case Side.Black:
                newSide = Side.White;
                break;
        }
        setActiveSide(newSide);
    }

    return (
        <StateContext.Provider value={state}>
            <FieldContainer>
                <Board/>
                <PieceContainer updateState={updateState}/>
            </FieldContainer>
        </StateContext.Provider>
    );
}