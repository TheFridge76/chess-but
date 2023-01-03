import React, {useState} from 'react';
import './App.css';
import styles from "./style/app.module.css"

import Game from "./components/Game";
import GameSetup from "./components/GameSetup";
import {Rules} from "./model/rules";
import HostConnection from "./components/HostConnection";
import PeerConnection from "./components/PeerConnection";

function App() {
    const [rules, setRules] = useState<Rules | undefined>({
        titleText: "it's completely normal",
        description: "This is local chess with the normal chess rules.\n" +
            "Detecting checkmate is left as an exercise to the players."
    });

    return (
        <div className="App">
            <h1>Chess, but <span className={styles.butText}>{rules === undefined
                ? "..." // TODO Slideshow through possibilities?
                : rules.titleText}</span></h1>
            <p>
                {rules === undefined ? "" : rules.description}
            </p>
            <HostConnection/>
            <PeerConnection/>
            {rules === undefined ? <GameSetup setRules={setRules}/> : <Game rules={rules}/>}
            <div className={styles.footer}>
                <hr/>
                <p>
                    Piece design <a href="https://github.com/lichess-org/lila/tree/master/public/piece/anarcandy">"Anarcandy"</a> from Lichess,
                    designed by <a href="https://github.com/caderek">caderek</a>.
                    Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>.
                </p>
            </div>
        </div>
    );
}

export default App;
