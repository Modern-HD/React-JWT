import Nav from "./nav/Nav";
import {Routes, Route} from 'react-router-dom'
import Home from "./home/Home";
import Board from "./board/Board";
import Member from "./member/Member";

function App() {
    return (
        <>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/board/*" element={<Board/>}></Route>
                <Route path="/member/*" element={<Member/>}></Route>
            </Routes>
        </>
    );
}

export default App;
