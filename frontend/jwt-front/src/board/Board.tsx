import {Routes, Route} from 'react-router-dom'
import Register from './Register';
import Detail from './Detail';
import List from './List';
import Modify from './Modify';
import { useRecoilState } from 'recoil';
import NavMode from '../state/NavMode';
import { useEffect } from 'react';

export default function Board() {

    const [, setNavMode] = useRecoilState(NavMode);
    useEffect(() => {
        setNavMode('board');
    })

    return (
        <Routes>
            <Route path='/' element={<List/>}></Route>
            <Route path='/:bno' element={<Detail/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/modify/:bno' element={<Modify/>}></Route>
        </Routes>
    );
}