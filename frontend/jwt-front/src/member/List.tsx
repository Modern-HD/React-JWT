import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Member from "../interface/Member";
import ListItem from "./ListItem";

export default function List() {

    const [memberList, setMemberList] = useState<Member[]>([]);
    useEffect(() => {
        axios.get<Member[]>("/api/member").then((result: AxiosResponse<Member[]>) => {
            setMemberList(result.data);
        })
    }, []);
    return (
        <div className="container mt-3">
            <h2>Member List</h2>
            <p>
                회원 목록
                <Link className="btn btn-primary mx-2" to='/member/register'>Register</Link>
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