import { Link } from "react-router-dom";
import Member from "../interface/Member";

export default function ListItem(props: {member: Member, key: number}) {
    return (
        <tr>
            <td>{props.member.mno}</td>
            <td><Link to={"/member/" + props.member.mno}>{props.member.email}</Link></td>
            <td>{props.member.nick_name}</td>
        </tr>
    )
}