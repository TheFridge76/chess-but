import React from 'react';
import './App.css';
import styles from "./style/app.module.css"


import Board from "./components/Board";
import PieceContainer from "./components/PieceContainer";
import FieldContainer from "./components/FieldContainer";

function App() {
    return (
        <div className="App">
            <h1>Chess, but <span className={styles.butText}>it's barely functional</span></h1>
            <p>
                You can move pieces around according to the most basic rules, but that's it.
                No capturing, no checking, no castling and worst of all: no en passanting.
            </p>
            <FieldContainer>
                <Board/>
                <PieceContainer/>
            </FieldContainer>
        </div>
    );
}

export default App;
