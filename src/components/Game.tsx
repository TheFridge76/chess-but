import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React, {useReducer} from "react";
import {Side} from "../model/types";
import {defaultPieces} from "../rules/setup/std";
import {GamePhase, GameState, updateState} from "../model/state";
import Promotion from "./Promotion";

export const StateContext = React.createContext<GameState>({
    activeSide: Side.White,
    phase: GamePhase.Turn,
    pieces: [],
    history: [],
});

export default function Game() {
    const [state, dispatchState] = useReducer(updateState, {
        activeSide: Side.White,
        phase: GamePhase.Turn,
        pieces: defaultPieces(),
        history: [],
    });

    return (
        <StateContext.Provider value={state}>
            <FieldContainer>
                <Board/>
                <PieceContainer updateState={dispatchState}/>
                {state.phase === GamePhase.Promotion ? <Promotion updateState={dispatchState}/> : null}
            </FieldContainer>
        </StateContext.Provider>
    );
}