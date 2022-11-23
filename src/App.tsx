import React from 'react';
import './App.css';
import styles from "./style/app.module.css"

import Game from "./components/Game";

function App() {
    return (
        <div className="App">
            <h1>Chess, but <span className={styles.butText}>it's barely functional</span></h1>
            <p>
                You can move pieces around according to the most basic rules, but that's it.
                No capturing, no checking, no castling and worst of all: no en passanting.
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
