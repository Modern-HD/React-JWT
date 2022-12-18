import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Board from "../interface/Board";

export default function Detail() {
    const { bno } = useParams();
    const [board, setBoard] = useState<Board>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get<Board>(`/api/board/${bno}`).then(result => {
            setBoard(result.data);
        })
    }, [bno])
    return (
        <div className="container mt-3">
            <h2>Board Detail</h2>
            <p>게시판 내용</p>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>Bno</td>
                        <td>{board?.bno}</td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>{board?.title}</td>
                    </tr>
                    <tr>
                        <td>writer</td>
                        <td>{board?.writer}</td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>{board?.content}</td>
                    </tr>
                    <tr>
                        <td>Create At</td>
                        <td>{board?.create_at}</td>
                    </tr>
                    <tr>
                        <td>Update At</td>
                        <td>{board?.update_at}</td>
                    </tr>
                </tbody>
            </table>
            <Link to='/board' className="btn btn-primary mx-1">List</Link>
            <Link to={'/board/modify/' + board?.bno} className="btn btn-outline-warning mx-1">Modify</Link>
            <button className="btn btn-outline-danger" onClick={() => {
                axios.delete('/api/board/' + bno).then((result: AxiosResponse<string>) => {
                    if (result.status === 200 && parseInt(result.data) > 0) {
                        alert('삭제 성공');
                        navigate("/board");
                    } else {
                        alert("삭제 실패");
                    }
                }).catch((err: AxiosError) => {
                    console.log(err);
                    alert("삭제 실패");
                })
            }}>Remove</button>
        </div>
    );
}