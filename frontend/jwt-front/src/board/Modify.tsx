import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Board from "../interface/Board";


export default function Modify() {
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
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const bnoInput = e.currentTarget.elements.namedItem("bno") as HTMLInputElement
                const titleInput = e.currentTarget.elements.namedItem("title") as HTMLInputElement
                const contentInput = e.currentTarget.elements.namedItem("content") as HTMLInputElement
                const body: Board = {
                    bno: parseInt(bnoInput.value),
                    title: titleInput.value,
                    content: contentInput.value
                }
                axios.put("/api/board/" + body.bno, JSON.stringify(body), { headers: {
                    "Content-Type": `application/json`,
                }}).then((result: AxiosResponse<string>) => {
                    console.log(result);
                    if (result.status === 200 && parseInt(result.data) > 0) {
                        alert("수정 성공!");
                        navigate(`/board/${body.bno}`);
                    } else {
                        alert("수정 실패");
                    }
                }).catch((err: AxiosError) => {
                    console.log(err);
                    alert("수정 실패");
                })
            }}>
                <input id="mno" type="hidden" defaultValue={board?.mno || ''}/>
                <div className="mb-3 mt-3">
                    <label htmlFor="bno" className="form-label">Bno</label>
                    <input type="text" className="form-control" id="bno" disabled defaultValue={board?.bno || ''}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" defaultValue={board?.title || ''}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" defaultValue={board?.content || ''}></textarea>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="writer" className="form-label">Writer</label>
                    <input className="form-control" id="writer" disabled defaultValue={board?.writer || ''}></input>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="create_at" className="form-label">Create At</label>
                    <input className="form-control" id="create_at" disabled defaultValue={board?.create_at || ''}></input>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="update_at" className="form-label">Update At</label>
                    <input className="form-control" id="update_at" disabled defaultValue={board?.update_at || ''}></input>
                </div>
                <div>
                    <Link to={'/board/' + board?.bno} className="btn btn-primary mx-1">back</Link>
                    <button type="submit" className="btn btn-outline-warning">Modify</button>
                </div>
            </form>
        </div>
    )
}