import React, {useReducer} from 'react';
import './App.css';
import styles from "./style/app.module.css"

import Game from "./components/Game";
import GameSetup from "./components/GameSetup";
import {Rules} from "./model/rules";
import HostConnection from "./components/HostConnection";
import PeerConnection from "./components/PeerConnection";
import ConnectionSetup, {ConnectionType} from "./components/ConnectionSetup";

enum Phase {
    SetConnection,
    AwaitingConnection,
    SetRules,
    AwaitingRules,
    Playing,
}

type State = {
    phase: Phase,
    connectionType?: ConnectionType,
    dataChannel?: RTCDataChannel,
    rules?: Rules,
}

function stateReducer(state: State, action: {
    type: "setConnectionType",
    connectionType: ConnectionType,
} | {
    type: "setDataChannel",
    dataChannel: RTCDataChannel,
} | {
    type: "setRules",
    rules: Rules,
}) {
    const newState = {...state};
    // Set stuff
    switch (action.type) {
        case "setConnectionType":
            console.assert(newState.phase === Phase.SetConnection);
            newState.connectionType = action.connectionType;
            break;
        case "setDataChannel":
            console.assert(newState.phase === Phase.SetConnection);
            newState.dataChannel = action.dataChannel;
            break;
        case "setRules":
            console.assert(newState.phase === Phase.SetRules);
            newState.rules = action.rules;
            break;
    }
    // Phase transitions
    switch (newState.phase) {
        case Phase.SetConnection:
            if (newState.connectionType === ConnectionType.Local) {
                newState.phase = Phase.SetRules;
            } else {
                newState.phase = Phase.AwaitingConnection;
            }
            break;
        case Phase.AwaitingConnection:
            if (newState.dataChannel) {
                if (newState.connectionType === ConnectionType.RemoteJoin) {
                    newState.phase = Phase.AwaitingRules;
                } else {
                    newState.phase = Phase.SetRules;
                }
            }
            break;
        case Phase.SetRules:
            if (newState.rules) {
                newState.phase = Phase.Playing;
            }
            break;
    }
    return newState;
}

function App() {
    const [state, dispatch] = useReducer(stateReducer, {
        phase: Phase.SetConnection,
    });

    //TODO Send/Receive rules over dataChannel

    function renderConnection(type: ConnectionType) {
        switch (type) {
            case ConnectionType.RemoteHost:
                return <HostConnection onDataChannel={(dataChannel) => {
                    dispatch({type: "setDataChannel", dataChannel: dataChannel});
                }}/>;
            case ConnectionType.RemoteJoin:
                return <PeerConnection onDataChannel={(dataChannel) => {
                    dispatch({type: "setDataChannel", dataChannel: dataChannel});
                }}/>;
        }
    }

    function renderPhase(phase: Phase) {
        switch (phase) {
            case Phase.SetConnection:
                return <ConnectionSetup onConfirm={(connType) => {
                    dispatch({type: "setConnectionType", connectionType: connType});
                }}/>;
            case Phase.AwaitingConnection:
                return renderConnection(state.connectionType as ConnectionType);
            case Phase.SetRules:
                return <GameSetup setRules={(rules) => {
                    dispatch({type: "setRules", rules: rules});
                }}/>;
            case Phase.AwaitingRules:
                return <p>Please wait for the host to set the rules</p>;
            case Phase.Playing:
                return <Game rules={state.rules as Rules} dataChannel={state.dataChannel}/>;
        }
    }

    return (
        <div className="App">
            <h1>Chess, but <span className={styles.butText}>{state.rules === undefined
                ? "..." // TODO Slideshow through possibilities?
                : state.rules.titleText}</span></h1>
            <p>
                {state.rules === undefined ? "" : state.rules.description}
            </p>
            {renderPhase(state.phase)}
            <div className={styles.footer}>
                <hr/>
                <p>
                    Piece design
                    <a href="https://github.com/lichess-org/lila/tree/master/public/piece/anarcandy">
                        "Anarcandy"
                    </a>
                    from Lichess,
                    designed by <a href="https://github.com/caderek">caderek</a>.
                    Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>.
                </p>
            </div>
        </div>
    );
}

export default App;
