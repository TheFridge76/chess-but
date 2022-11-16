import {Piece} from "./Piece";
import Field from "./Field";

function Board() {
    return (
        <Field>
            <Piece color="black" pieceType="rook"/>
            <Piece color="black" pieceType="horsey"/>
            <Piece color="black" pieceType="bishop"/>
            <Piece color="black" pieceType="queen"/>
            <Piece color="black" pieceType="king"/>
            <Piece color="black" pieceType="bishop"/>
            <Piece color="black" pieceType="horsey"/>
            <Piece color="black" pieceType="rook"/>

            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>
            <Piece color="black" pieceType="pawn"/>

            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>
            <Piece color="white" pieceType="pawn"/>

            <Piece color="white" pieceType="rook"/>
            <Piece color="white" pieceType="horsey"/>
            <Piece color="white" pieceType="bishop"/>
            <Piece color="white" pieceType="queen"/>
            <Piece color="white" pieceType="king"/>
            <Piece color="white" pieceType="bishop"/>
            <Piece color="white" pieceType="horsey"/>
            <Piece color="white" pieceType="rook"/>
        </Field>
    );
}

export default Board;