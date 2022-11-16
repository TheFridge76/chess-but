import React from 'react';
import './App.css';

import Board from "./components/Board";
import PieceContainer from "./components/PieceContainer";
import FieldContainer from "./components/FieldContainer";

function App() {
    return (
        <div className="App">
            <h1>Chess, but...</h1>
            <FieldContainer>
                <Board/>
                <PieceContainer/>
            </FieldContainer>
        </div>
    );
}

export default App;
