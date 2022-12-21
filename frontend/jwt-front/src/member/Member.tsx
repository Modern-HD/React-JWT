import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import NavMode from "../state/NavMode";
import Detail from "./Detail";
import List from "./List";
import Login from "./Login";
import Modify from "./Modify";
import Register from "./Register";

export default function Member() {

    const setNavMode = useSetRecoilState(NavMode);
    useEffect(() => {
        setNavMode('member');
    })

    return (
        <Routes>
            <Route path="/" element={<List/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/:mno" element={<Detail/>}></Route>
            <Route path="/modify/:mno" element={<Modify/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
        </Routes>
    );
}