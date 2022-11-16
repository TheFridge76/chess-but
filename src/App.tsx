import React from 'react';
import './App.css';

import Board from "./components/Board";
import PieceContainer from "./components/PieceContainer";

function App() {
    return (
        <div className="App">
            <Board/>
            <PieceContainer/>
        </div>
    );
}

export default App;
