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
            <form>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="text" onChange={onChange} className="form-control" id="email" name="email" />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="pwd" className="form-label">pwd</label>
                    <input type="password" className="form-control" onChange={onChange} id="pwd" name="pwd"></input>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="nick_name" className="form-label">Writer</label>
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