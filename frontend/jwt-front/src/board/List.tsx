import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Board from '../interface/Board';
import ListItem from "./ListItem";

export default function List() {
    const [boardList, setBoardList] = useState<Board[]>([]);
    useEffect(() => {
        axios.get<Board[]>("/api/board").then(result => {
            setBoardList(result.data);
        })
    }, []);
    return (
        <div className="container mt-3">
            <h2>Board List</h2>
            <p>게시판 목록 <Link to='/board/register' className="mx-2 btn btn-primary">Register</Link></p>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Bno</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>CreateAt</th>
                        <th>UpdateAt</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((el: Board, idx: number) => <ListItem board={el} key={idx} />)}
                </tbody>
            </table>
        </div>
    );
}
