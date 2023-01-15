import React, {useEffect, useState} from 'react';
import './App.css';
import styles from "./style/app.module.css"

import Game from "./components/Game";
import GameSetup from "./components/GameSetup";
import {Rules} from "./model/rules";
import HostConnection from "./components/HostConnection";
import PeerConnection from "./components/PeerConnection";
import ConnectionSetup, {ConnectionType} from "./components/ConnectionSetup";

function App() {
    const [rules, setRules] = useState<Rules | undefined>({
        titleText: "it's completely normal",
        description: "This is local chess with the normal chess rules.\n" +
            "Detecting checkmate is left as an exercise to the players."
    });
    const [connectionType, setConnectionType] = useState<ConnectionType | undefined>(undefined);
    const [isConnected, setConnected] = useState(false);
    const [dataChannel, setDataChannel] = useState<RTCDataChannel | undefined>(undefined);

    useEffect(() => {
        if (connectionType === ConnectionType.Local) {
            setConnected(true);
        }
    }, [connectionType]);

    useEffect(() => {
        if (dataChannel !== undefined) {
            setConnected(true);
        }
    }, [dataChannel]);

    function renderConnection(type: ConnectionType | undefined) {
        switch (type) {
            case undefined:
                return <ConnectionSetup onConfirm={setConnectionType}/>;
            case ConnectionType.RemoteHost:
                return <HostConnection onDataChannel={setDataChannel}/>;
            case ConnectionType.RemoteJoin:
                return <PeerConnection onDataChannel={setDataChannel}/>;
        }
        return null;
    }

    return (
        <div className="App">
            <h1>Chess, but <span className={styles.butText}>{rules === undefined
                ? "..." // TODO Slideshow through possibilities?
                : rules.titleText}</span></h1>
            <p>
                {rules === undefined ? "" : rules.description}
            </p>
            {isConnected ? null : renderConnection(connectionType)}
            {rules ? null : <GameSetup setRules={setRules}/>}
            {rules && isConnected ? <Game rules={rules} dataChannel={dataChannel}/> : null}
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
