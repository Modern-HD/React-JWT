import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Member from "../interface/Member";

export default function Register() {
    const [data, setData] = useState<Member>({});
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData({...data, [input.name]: input.value});
    }

    return (
        <div className="container mt-3">
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const body: Member = data;
                console.log(body);
                axios.post("/api/member", JSON.stringify(body), {
                    headers: { "Content-Type" : "application/json"}
                }).then( (result: AxiosResponse<string>) => {
                    if (result.status === 200 && parseInt(result.data) > 0) {
                        alert("회원 가입 성공!");
                        navigate('/member/' + result.data);
                    } else {
                        alert("회원 가입 실패");
                    }
                }).catch( (err: AxiosError) => {
                    console.log(err);
                    alert("회원 가입 실패");
                })
            }}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" onChange={onChange} className="form-control" id="email" name="email" />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="pwd" name="pwd"></input>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="nick_name" className="form-label">Nick Name</label>
                    <input className="form-control" onChange={onChange} id="nick_name" name="nick_name"></input>
                </div>
                <div>
                    <Link to={'/member'} className="btn btn-primary mx-1">Back</Link>
                    <button type="submit" className="btn btn-outline-warning">Register</button>
                </div>
            </form>
        </div>
    )
}