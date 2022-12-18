import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Member from "../interface/Member";

export default function Modify() {
    const { mno } = useParams();
    const [member, setMember] = useState<Member>({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get<Member>("/api/member/" + mno).then((result: AxiosResponse<Member>) => {
            setMember(result.data);
        })
    }, [mno]);

    return (
        <div className="container mt-3">
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const mnoInput = e.currentTarget.elements.namedItem("mno") as HTMLInputElement;
                const pwdInput = e.currentTarget.elements.namedItem("pwd") as HTMLInputElement;
                const nickNameInput = e.currentTarget.elements.namedItem("nick_name") as HTMLInputElement;

                const body: Member = {
                    mno: parseInt(mnoInput.value),
                    pwd: pwdInput.value,
                    nick_name: nickNameInput.value
                }
                axios.put("/api/member/" + mno, JSON.stringify(body), {
                    headers: {"Content-Type": "application/json"}
                }).then( (result: AxiosResponse<string>) => {
                    if (result.status === 200 && parseInt(result.data) > 0) {
                        alert("수정 성공!");
                        navigate("/member/" + mno);
                    } else {
                        alert("수정 실패");
                    }
                }).catch((err: AxiosError) => {
                    console.log(err);
                    alert("수정 실패");
                })
            }}>
                <input type="hidden" name="mno" id="mno" defaultValue={mno} />
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" defaultValue={member.email} disabled/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" defaultValue={member.pwd} id="pwd" name="pwd"></input>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="nick_name" className="form-label">Nick Name</label>
                    <input className="form-control" defaultValue={member.nick_name} id="nick_name" name="nick_name"></input>
                </div>
                <div>
                    <Link to={'/member'} className="btn btn-primary mx-1">Back</Link>
                    <button type="submit" className="btn btn-outline-warning">Modify</button>
                </div>
            </form>
        </div>
    )
}