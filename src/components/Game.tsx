import FieldContainer from "./FieldContainer";
import Board from "./Board";
import PieceContainer from "./PieceContainer";
import React from "react";
import {GameState, MoveValidator, PieceState, PieceType, Side} from "../rules/Types";
import {bishop, howDoesItMove, king, pawn, queen, rook} from "../rules/std";
import {negate, onField} from "../rules/util";

export const StateContext = React.createContext<GameState>({
    activeSide: Side.White,
    pieces: [],
});

export default function Game() {
    function getValidatorsPos(piece: PieceType) {
        const validatorsPos: MoveValidator[] = [];
        switch(piece) {
            case "horsey":
                validatorsPos.push(howDoesItMove);
                break;
            case "bishop":
                validatorsPos.push(bishop);
                break;
            case "king":
                validatorsPos.push(king);
                break;
            case "pawn":
                validatorsPos.push(pawn);
                break;
            case "queen":
                validatorsPos.push(queen);
                break;
            case "rook":
                validatorsPos.push(rook);
                break;
        }
        return validatorsPos;
    }

    const backRow: PieceType[] = ["rook", "horsey", "bishop", "queen", "king", "bishop", "horsey", "rook"];
    const frontRow: PieceType[] = ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"];

    const pieces: PieceState[] = [];
    backRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 1,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [negate(onField)],
        });
    });
    frontRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 2,
            col: index + 1,
            color: Side.White,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [negate(onField)],
        });
    });
    backRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 8,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [negate(onField)],
        });
    });
    frontRow.forEach((piece, index) => {
        const validatorsPos = getValidatorsPos(piece);
        pieces.push({
            row: 7,
            col: index + 1,
            color: Side.Black,
            pieceType: piece,
            validatorsPos: validatorsPos,
            validatorsNeg: [negate(onField)],
        });
    });

    const state = {
        activeSide: Side.White,
        pieces: pieces,
    };
    return (
        <StateContext.Provider value={state}>
            <FieldContainer>
                <Board/>
                <PieceContainer/>
            </FieldContainer>
        </StateContext.Provider>
    );
}