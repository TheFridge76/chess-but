import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React, {useReducer} from "react";
import {Side} from "../model/types";
import {defaultPieces} from "../rules/setup/std";
import {GameState, updateState} from "../model/state";

export const StateContext = React.createContext<GameState>({
    activeSide: Side.White,
    pieces: [],
    history: [],
});

export default function Game() {
    const [state, dispatchState] = useReducer(updateState, {
        activeSide: Side.White,
        pieces: defaultPieces(),
        history: [],
    });

    return (
        <StateContext.Provider value={state}>
            <FieldContainer>
                <Board/>
                <PieceContainer updateState={dispatchState}/>
            </FieldContainer>
        </StateContext.Provider>
    );
}