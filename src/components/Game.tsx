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
    phase: {type: GamePhase.Turn, data: {}},
    pieces: [],
    history: [],
});

export const BoardContext = React.createContext({
    flipped: false,
});

export default function Game() {
    const [state, dispatchState] = useReducer(updateState, {
        activeSide: Side.White,
        phase: {type: GamePhase.Turn, data: {}},
        pieces: defaultPieces(),
        history: [],
    });

    return (
        <StateContext.Provider value={state}>
            <BoardContext.Provider value={{flipped: false}}>
                <FieldContainer>
                    <Board/>
                    <PieceContainer updateState={dispatchState}/>
                    {state.phase.type === GamePhase.Promotion
                        ? <Promotion updateState={dispatchState} square={state.phase.data.on} side={state.phase.data.side}/>
                        : null}
                </FieldContainer>
            </BoardContext.Provider>
        </StateContext.Provider>
    );
}