import React from 'react';
import './App.css';
import styles from "./style/app.module.css"

import Game from "./components/Game";

function App() {
    return (
        <div className="App">
            <h1>Chess, but <span className={styles.butText}>it's completely normal</span></h1>
            <p>
                This is local chess with the normal chess rules.
                Detecting checkmate is left as an exercise to the players.
            </p>
            <Game/>
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
