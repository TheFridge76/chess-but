import {Piece} from "./Piece";
import Field from "./Field";

function Board() {
    return (
        <Field>
            <Piece row={8} col={1} color="black" pieceType="rook"/>
            <Piece row={8} col={2} color="black" pieceType="horsey"/>
            <Piece row={8} col={3} color="black" pieceType="bishop"/>
            <Piece row={8} col={4} color="black" pieceType="queen"/>
            <Piece row={8} col={5} color="black" pieceType="king"/>
            <Piece row={8} col={6} color="black" pieceType="bishop"/>
            <Piece row={8} col={7} color="black" pieceType="horsey"/>
            <Piece row={8} col={8} color="black" pieceType="rook"/>

            <Piece row={7} col={1} color="black" pieceType="pawn"/>
            <Piece row={7} col={2} color="black" pieceType="pawn"/>
            <Piece row={7} col={3} color="black" pieceType="pawn"/>
            <Piece row={7} col={4} color="black" pieceType="pawn"/>
            <Piece row={7} col={5} color="black" pieceType="pawn"/>
            <Piece row={7} col={6} color="black" pieceType="pawn"/>
            <Piece row={7} col={7} color="black" pieceType="pawn"/>
            <Piece row={7} col={8} color="black" pieceType="pawn"/>

            <Piece row={2} col={1} color="white" pieceType="pawn"/>
            <Piece row={2} col={2} color="white" pieceType="pawn"/>
            <Piece row={2} col={3} color="white" pieceType="pawn"/>
            <Piece row={2} col={4} color="white" pieceType="pawn"/>
            <Piece row={2} col={5} color="white" pieceType="pawn"/>
            <Piece row={2} col={6} color="white" pieceType="pawn"/>
            <Piece row={2} col={7} color="white" pieceType="pawn"/>
            <Piece row={2} col={8} color="white" pieceType="pawn"/>

            <Piece row={1} col={1} color="white" pieceType="rook"/>
            <Piece row={1} col={2} color="white" pieceType="horsey"/>
            <Piece row={1} col={3} color="white" pieceType="bishop"/>
            <Piece row={1} col={4} color="white" pieceType="queen"/>
            <Piece row={1} col={5} color="white" pieceType="king"/>
            <Piece row={1} col={6} color="white" pieceType="bishop"/>
            <Piece row={1} col={7} color="white" pieceType="horsey"/>
            <Piece row={1} col={8} color="white" pieceType="rook"/>
        </Field>
    );
}

export default Board;