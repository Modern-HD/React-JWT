import { useEffect } from "react";
import { useRecoilState } from "recoil";
import NavMode from "../state/NavMode";

export default function Home() {

    const [, setNavMode] = useRecoilState(NavMode);
    useEffect(() => {
        setNavMode('home');
    })

    return (
        <div>
            Jwt Test Project!
        </div>
    );
}