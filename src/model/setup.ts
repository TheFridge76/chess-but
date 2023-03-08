import {Piece, PieceStaticProps, Side} from "./types";
import {GameRules} from "./rules";
import {PieceType} from "../rules/library";

type ParsePieceFunction = (rules: GameRules, pieceString: string) => PieceStaticProps | undefined;

export const parsePiece: ParsePieceFunction = (rules, pieceString) => {
    if (pieceString.length === 1) {
        return parsePieceShort(rules, pieceString);
    } else {
        return parsePieceLong(rules, pieceString);
    }
}

const parsePieceLong: ParsePieceFunction = (rules, pieceString) => {
    const [id, side] = pieceString.split("_");
    const pieceType = rules.pieces[id as PieceType];
    if (pieceType && rules.playableSides.includes(side as Side)) {
        return {
            pieceType: id as PieceType,
            renderAs: pieceType.renderAs,
            color: side as Side,
            validators: pieceType.validators(Side.Black),
        };
    } else {
        return undefined;
    }
}

const parsePieceShort: ParsePieceFunction = (rules, pieceString) => {
    return undefined;
}

export function stringToPieces(setupStr: string, parsePiece: (pieceString: string) => PieceStaticProps | undefined): Piece[] {
    const rows = setupStr.split("/");
    const pieces: Piece[] = [];
    const longFormRegex = /\[([a-zA-Z:]+)]/g;
    const emptySpaceRegex = /([0-9]+)/g;
    for (let [y, row] of rows.entries()) {
        let x = 0;
        let nextLong;
        let nextEmpty;
        for (let i = 0; i < row.length; i++) {
            if (longFormRegex.lastIndex <= i) {
                nextLong = longFormRegex.exec(row);
                if (nextLong === null) {
                    longFormRegex.lastIndex = row.length;
                }
            }
            if (emptySpaceRegex.lastIndex <= i) {
                nextEmpty = emptySpaceRegex.exec(row);
                if (nextEmpty === null) {
                    emptySpaceRegex.lastIndex = row.length;
                }
            }
            if (nextEmpty && i === nextEmpty.index) {
                const emptyLength = parseInt(nextEmpty[1]);
                i = emptySpaceRegex.lastIndex - 1;
                x += emptyLength;
                continue;
            }
            const id = (nextLong && i === nextLong.index) ? nextLong[1] : row[i];
            const piece = parsePiece(id);
            if (piece) {
                pieces.push({...piece, col: x + 1, row: y + 1});
            } else {
                console.error(`Invalid setup: Could not find piece "${id}"`);
                return [];
            }
            x++;
            if (nextLong && i === nextLong.index) {
                i = longFormRegex.lastIndex - 1;
            }
        }
    }
    return pieces;
}