import { AxiosResponse } from "axios";
import authReq from "../util/authReq"
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthResponse from "../interface/AuthResponse";
import Member from "../interface/Member";
import ListItem from "./ListItem";

export default function List() {

    const [memberList, setMemberList] = useState<Member[] | undefined>([]);
    useEffect(() => {
        authReq.get<AuthResponse<Member[]>>("/api/member").then((result: AxiosResponse<AuthResponse<Member[]>>) => {
            setMemberList(result.data.body);
        })
    }, []);
    if (!memberList) { return <Navigate to='/member/login' replace/> }
    return (
        <div className="container mt-3">
            <h2>Member List</h2>
            <p>
                회원 목록
                <Link className="btn btn-primary mx-2" to='/member/register'>Register</Link>
                <Link className="btn btn-primary mx-2" to='/member/login'>Login</Link>
            </p>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>mno</th>
                        <th>email</th>
                        <th>nick_name</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map((el: Member, idx: number) => <ListItem member={el} key={idx} />)}
                </tbody>
            </table>
        </div>
    )
}