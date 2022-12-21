import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import NavMode from "../state/NavMode";

export default function Home() {

    const setNavMode = useSetRecoilState(NavMode);
    useEffect(() => {
        setNavMode('home');
    })

    return (
        <div>
            Jwt Test Project!
        </div>
    );
}