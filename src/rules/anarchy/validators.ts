import {AnaValidator} from "./enums";
import {MoveValidator} from "../../model/moves";
import {StdPieceType} from "../std/pieceTypes";
import {ResultType} from "../../model/results";
import {pieceOnSquare} from "../../model/state";

//TODO Allow configuration of able pieces and so on
const IlVaticano: MoveValidator = (from, to, state) => {
    const distY = Math.abs(from.row - to.row);
    const distX = Math.abs(from.col - to.col);
    const vY = distY === 0 ? 0 : (to.row - from.row) / distY;
    const vX = distX === 0 ? 0 : (to.col - from.col) / distX;

    if (!((distX === 3 && distY === 0) || (distX === 0 && distY === 3))) {
        // Must target three spaces in one direction
        return [];
    }

    const targetedPiece = pieceOnSquare(state, to);
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
        const passedPiece = pieceOnSquare(state, passedSquare);
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