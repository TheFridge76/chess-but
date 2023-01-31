import {AnaValidator} from "./enums";
import {MoveValidator} from "../../model/moves";
import {StdPieceType} from "../std/pieceTypes";
import {sameSquare} from "../../model/types";
import {ResultType} from "../../model/results";

//TODO Allow configuration of able pieces and so on
const IlVaticano: MoveValidator = (from, to, state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    const vY = distY === 0 ? 0 : (to.row - from.row) / distY;
    const vX = distX === 0 ? 0 : (to.col - from.col) / distX;

    console.log(distX, distY, vX, vY);

    if (!((distX === 3 && distY === 0) || (distX === 0 && distY === 3))) {
        // Must target three spaces in one direction
        return [];
    }

    //TODO extract function for finding piece on square
    const targetedPiece = state.pieces.find((piece) => sameSquare(to, {row: piece.row, col: piece.col}));
    console.log(targetedPiece);
    if (targetedPiece === undefined || targetedPiece.pieceType !== StdPieceType.Bishop) {
        // Must target another bishop
        return [];
    }

    const passedSquares = [];
    for (let i = 1; i <= 2; i++) {
        const passedSquare = {
            row: from.row + vY * i,
            col: from.col + vX * i,
        };
        const passedPiece = state.pieces.find((piece) => sameSquare(passedSquare, {row: piece.row, col: piece.col}));
        console.log(passedPiece, passedSquare);
        if (passedPiece === undefined || passedPiece.pieceType !== StdPieceType.Pawn) {
            // Must pass pawns
            return [];
        }
        passedSquares.push(passedSquare);
    }

    return [{
        type: ResultType.Capture,
        on: passedSquares[0],
    }, {
        type: ResultType.Capture,
        on: passedSquares[1],
    }, {
        type: ResultType.EndTurn,
    }];
};

export const validatorCatalog: Record<AnaValidator, MoveValidator> = {
    [AnaValidator.IlVaticano]: IlVaticano,
};