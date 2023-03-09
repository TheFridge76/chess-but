import {Piece, PieceStaticProps, Side} from "./types";
import {GameRules, PieceRules} from "./rules";
import {PieceType, shortForms} from "../rules/library";

type Rules = Pick<GameRules, "pieces" | "playableSides">;
type ParsePieceFunction = (rules: Rules, pieceString: string) => PieceStaticProps | undefined;

export const parsePiece: ParsePieceFunction = (rules, pieceString) => {
    if (pieceString.length === 1) {
        return parsePieceShort(rules, pieceString);
    } else {
        return parsePieceLong(rules, pieceString);
    }
}

const parsePieceLong: ParsePieceFunction = (rules, pieceString) => {
    const [id, side] = pieceString.split("_");
    const piece = rules.pieces[id as PieceType];
    if (piece && rules.playableSides.includes(side as Side)) {
        return {
            pieceType: id as PieceType,
            renderAs: piece.renderAs,
            color: side as Side,
            validators: piece.validators(side as Side),
        };
    } else {
        return undefined;
    }
}

const parsePieceShort: ParsePieceFunction = (rules, pieceString) => {
    const side = pieceString.toLowerCase() === pieceString ? Side.Black : Side.White;
    const pieceType = shortForms[pieceString.toLowerCase() as keyof typeof shortForms];
    if (pieceType && rules.pieces[pieceType]) {
        const piece = rules.pieces[pieceType] as PieceRules;
        return {
            pieceType: pieceType,
            renderAs: piece.renderAs,
            color: side,
            validators: piece.validators(side),
        };
    }
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
                pieces.push({...piece, col: x + 1, row: rows.length - y});
            } else {
                console.error(`Invalid setup: Could not find piece "${id}"`);
                return [];
            }
            x++;
            if (nextLong && i === nextLong.index) {
                i = longFormRegex.lastIndex - 1;
            }
        }
        longFormRegex.lastIndex = 0;
        emptySpaceRegex.lastIndex = 0;
    }
    return pieces;
}