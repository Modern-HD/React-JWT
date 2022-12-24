import axios, { AxiosResponse } from "axios";
import authReq from "../util/authReq"
import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import LoginResponse from "../interface/LoginResponse";
import Member from "../interface/Member";
import LoginStat from "../state/LoginStat";

export default function Login() {

    const [data, setData] = useState<Member>({});
    const [loginStat, setLoginStat] = useRecoilState(LoginStat);
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData({...data, [input.name]: input.value});
    }
    if (loginStat != null) {<Navigate to='/' />}
    return (
        <div className="container mt-3 bg-light p-3 rounded-1">
            <h2>Login</h2>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const body: Member = data;
                console.log(body);
                axios.post("/api/member/login", JSON.stringify(body), {
                    headers: { "Content-Type" : "application/json"}
                }).then((result: AxiosResponse<LoginResponse>) => {
                    if (result.data.jwt.success === 1) {
                        authReq.defaults.headers.common['Authorization'] = `Bearer ${result.data.jwt.token}`;
                        setLoginStat(result.data.member);
                        navigate('/');
                    } else {
                        alert(result.data.jwt.message);
                    }
                })
            }}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" onChange={onChange} className="form-control" id="email" placeholder="Enter email" name="email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" onChange={onChange} className="form-control" id="pwd" placeholder="Enter password" name="pwd" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}