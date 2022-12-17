import Board from "../interface/Board";
import { Link } from "react-router-dom"

export default function ListItem(props: {board: Board, key: number}) {
    return (
        <tr>
            <td>{props.board.bno}</td>
            <td><Link to={"/board/" + props.board.bno}>{props.board.title}</Link></td>
            <td>{props.board.writer}</td>
            <td>{props.board.create_at}</td>
            <td>{props.board.create_at}</td>
        </tr>
    );
}
