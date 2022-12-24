import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginStat from '../state/LoginStat';
import NavMode from '../state/NavMode';

export default function Nav() {

    const [navMode] = useRecoilState(NavMode);
    const [loginStat] = useRecoilState(LoginStat);

    return (
        <nav className="navbar navbar-expand-sm bg-success navbar-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={"nav-link" + (navMode === 'home' ? ' active' : '') } to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link" + (navMode === 'member' ? ' active' : '') } to="/member">member</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link" + (navMode === 'board' ? ' active' : '') } to="/board">board</Link>
                        </li>
                    </ul>
                    <div className='text-white'>
                        {loginStat ? loginStat.nick_name : ''}
                    </div>
                </div>
            </div>
        </nav>
    )
}