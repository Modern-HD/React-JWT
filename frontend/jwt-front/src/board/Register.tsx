import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Board from "../interface/Board";

export default function Create() {
    const [data, setData] = useState<Board>({});
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement
        setData({...data, [input.name]: input.value});
    }

    return (
        <div className="container mt-3">
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const mnoInput = e.currentTarget.elements.namedItem("mno") as HTMLInputElement;
                const body = {...data, "mno": parseInt(mnoInput.value)};
                axios.post('/api/board/' + mnoInput.value, JSON.stringify(body), { headers: {
                    "Content-Type": `application/json`
                }}).then((result: AxiosResponse<string>) => {
                    if (result.status === 200) {
                        alert("등록 성공!");
                        navigate(`/board/${result.data}`);
                    } else {
                        alert("등록 실패");
                    }
                }).catch((err: AxiosError) => {
                    console.log(err);
                    alert("등록 실패");
                })
            }}>
                <input id="mno" type="hidden" defaultValue={1}/>
                <div className="mb-3 mt-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onChange} className="form-control" id="title" name="title"/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" onChange={onChange} id="content" name="content"></textarea>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="writer" className="form-label">Writer</label>
                    <input className="form-control" onChange={onChange} id="writer" name="writer"></input>
                </div>
                <div>
                    <Link to={'/board'} className="btn btn-primary mx-1">Back</Link>
                    <button type="submit" className="btn btn-outline-warning">Register</button>
                </div>
            </form>
        </div>
    )
}