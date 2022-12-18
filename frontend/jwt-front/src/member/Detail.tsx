import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Member from "../interface/Member";

export default function Detail() {
    const { mno } = useParams();
    const [member, setMember] = useState<Member>({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get<Member>("/api/member/" + mno).then( (result: AxiosResponse<Member>) => {
            setMember(result.data);
        })
    }, [mno]);

    return (
        <div className="container mt-3">
            <h2>Member List</h2>
            <p>
                회원 정보
            </p>
            <table className="table table-dark table-striped">
                <tbody>
                    <tr>
                        <td>Mno</td>
                        <td>{member.mno}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{member.email}</td>
                    </tr>
                    <tr>
                        <td>Nick Name</td>
                        <td>{member.nick_name}</td>
                    </tr>
                    <tr>
                        <td>Create At</td>
                        <td>{member.create_at}</td>
                    </tr>
                    <tr>
                        <td>Update At</td>
                        <td>{member.update_at}</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/member" className="btn btn-primary">Back</Link>
            <Link to={"/member/modify/" + mno} className="mx-2 btn btn-outline-warning">Modify</Link>
            <button className="btn btn-outline-danger" onClick={() => {
                axios.delete("/api/member/" + mno).then((result: AxiosResponse<string>) => {
                    if (result.status === 200 && parseInt(result.data) > 0) {
                        alert("삭제 성공!");
                        navigate("/member");
                    } else {
                        alert("삭제 실패");
                    }
                }).catch((err: AxiosError) => {
                    console.log(err);
                    alert("삭제 실패");
                })
            }}>Remove</button>
        </div>
    )
}