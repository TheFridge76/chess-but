import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React, {useEffect, useMemo, useReducer} from "react";
import {Side} from "../model/types";
import {GamePhase, GameState, updateState} from "../model/state";
import Promotion from "./Promotion";
import {Rules, toGameRules} from "../model/rules";
import {Result} from "../model/results";
import {decodeMessage, encodeMessage, MessageType} from "../model/webrtc";
import {parsePiece, stringToPieces} from "../model/setup";

export const StateContext = React.createContext<GameState>({
    activeSide: Side.White,
    phase: {type: GamePhase.Turn, data: {}},
    pieces: [],
    history: [],
});

export const BoardContext = React.createContext({
    flipped: false,
});

type GameProps = {
    rules: Rules,
    dataChannel?: RTCDataChannel,
}

export default function Game(props: GameProps) {
    const gameRules = useMemo(() => toGameRules(props.rules), [props.rules]);
    console.log(gameRules.setup);
    const [state, dispatchState] = useReducer(updateState, {
        activeSide: Side.White,
        phase: {type: GamePhase.Turn, data: {}},
        pieces: stringToPieces(gameRules.setup, parsePiece.bind(null, gameRules)),
        history: [],
    });
    const dataChannel = props.dataChannel;

    useEffect(() => {
        if (dataChannel === undefined) {
            return;
        }

        function messageHandler(e: MessageEvent) {
            const message = decodeMessage(e.data);
            if (message.type === MessageType.Move) {
                dispatchState(message.content);
            }
        }

        dataChannel.addEventListener("message", messageHandler);
        return () => {
            dataChannel.removeEventListener("message", messageHandler);
        };
    }, [dataChannel]);

    function updateAndSendState(action: Result) {
        dispatchState(action);
        if (dataChannel !== undefined) {
            dataChannel.send(encodeMessage({
                type: MessageType.Move,
                content: action,
            }));
        }
    }

    return (
        <StateContext.Provider value={state}>
            <BoardContext.Provider value={{
                flipped: props.rules.playableSides.find((s) => s === Side.White) === undefined
            }}>
                <FieldContainer>
                    <Board/>
                    <PieceContainer updateState={updateAndSendState} rules={gameRules}/>
                    {state.phase.type === GamePhase.Promotion
                        ? <Promotion updateState={updateAndSendState}
                                     square={state.phase.data.on}
                                     side={state.phase.data.side}
                                     rules={gameRules}/>
                        : null}
                </FieldContainer>
            </BoardContext.Provider>
        </StateContext.Provider>
    );
}