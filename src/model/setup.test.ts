import {parsePiece, stringToPieces} from "./setup";
import {StdPieceType} from "../rules/std/pieceTypes";
import {Side} from "./types";
import {std} from "../rules/std/ruleset";
import {PieceType} from "../rules/library";

describe("parse piece", () => {
    const rules = {
        playableSides: [Side.White, Side.Black],
        pieces: std.pieces,
    };

    test.each([
        ["p", StdPieceType.Pawn],
        ["n", StdPieceType.Horsey],
    ])("parses short form %s", (id: string, pieceType: PieceType) => {
        const piece = parsePiece(rules, id);
        expect(piece?.pieceType).toEqual(pieceType);
    });
    test.each([
        ["n", Side.Black],
        ["N", Side.White],
    ])("gets side from short form %s", (id: string, side: Side) => {
        const piece = parsePiece(rules, id);
        expect(piece?.side).toEqual(side);
    });
    test("fails on invalid short form", () => {
        const id = "s";
        const piece = parsePiece(rules, id);
        expect(piece).toEqual(undefined);
    });
    test.each([
        [StdPieceType.Pawn],
        [StdPieceType.Horsey],
    ])("parses long form %s", (pieceType: PieceType) => {
        const id = `${pieceType}_${Side.White}`;
        const piece = parsePiece(rules, id);
        expect(piece?.pieceType).toEqual(pieceType);
    });
    test.each([
        [`${StdPieceType.Horsey}_${Side.Black}`, Side.Black],
        [`${StdPieceType.Horsey}_${Side.White}`, Side.White],
    ])("gets side from long form %s", (id: string, side: Side) => {
        const piece = parsePiece(rules, id);
        expect(piece?.side).toEqual(side);
    });
    test("fails on invalid long form", () => {
        const id = "popo";
        const piece = parsePiece(rules, id);
        expect(piece).toEqual(undefined);
    });
});

describe("string to setup", () => {
    const pieceParser = (_pieceString: string) => {
        return {
            pieceType: StdPieceType.Horsey,
            side: Side.White,
            renderColor: Side.White,
            renderAs: "horsey",
            validators: [],
        };
    };

    describe("returns empty setup", () => {
        test("for empty string", () => {
            const setupStr = "";
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(0);
        });
        test("for empty rows", () => {
            const setupStr = "/////";
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(0);
        });
    });
    describe("handles", () => {
        test("single piece in short form", () => {
            const setupStr = "n";
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(1);
            expect(setup[0].pieceType).toEqual(StdPieceType.Horsey);
        });
        test("single piece in long form", () => {
            const setupStr = `[${StdPieceType.Horsey}]`;
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(1);
            expect(setup[0].pieceType).toEqual(StdPieceType.Horsey);
        });
        test("mixed short and long form", () => {
            const setupStr = `[${StdPieceType.Horsey}]n[${StdPieceType.Horsey}]`;
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(3);
            for (let piece of setup) {
                expect(piece.pieceType).toEqual(StdPieceType.Horsey);
            }
        });
        test("pieces in multiple rows", () => {
            const setupStr = `nnn/n//nn`;
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(6);
            for (let piece of setup) {
                expect(piece.pieceType).toEqual(StdPieceType.Horsey);
            }
        });
        test("explicit empty rows", () => {
            const setupStr = `nnnnnnnn/8/nnnnnnnn`;
            const setup = stringToPieces(setupStr, pieceParser);
            expect(setup.length).toEqual(16);
            for (let piece of setup) {
                expect(piece.pieceType).toEqual(StdPieceType.Horsey);
            }
        });
    });
    describe("correctly places", () => {
        test("pieces at beginning of row", () => {
            const setupStr = `n//n/n`;
            const setup = stringToPieces(setupStr, pieceParser);
            for (let row of [1, 2, 4]) {
                expect(setup.find((piece) => piece.col === 1 && piece.row === row)).not.toEqual(undefined);
            }
            expect(setup.find((piece) => piece.col === 1 && piece.row === 5)).toEqual(undefined);
        });
        test("pieces in same row", () => {
            const setupStr = `nnn`;
            const setup = stringToPieces(setupStr, pieceParser);
            for (let col of [1, 2, 3]) {
                expect(setup.find((piece) => piece.col === col && piece.row === 1)).not.toEqual(undefined);
            }
            expect(setup.find((piece) => piece.col === 4 && piece.row === 1)).toEqual(undefined);
        });
        test("pieces with empty space", () => {
            const setupStr = `nn4n`;
            const setup = stringToPieces(setupStr, pieceParser);
            for (let col of [1, 2, 7]) {
                expect(setup.find((piece) => piece.col === col && piece.row === 1)).not.toEqual(undefined);
            }
            expect(setup.find((piece) => piece.col === 8 && piece.row === 1)).toEqual(undefined);
        });
    });
});