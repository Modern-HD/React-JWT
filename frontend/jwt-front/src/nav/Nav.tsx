import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import NavMode from '../state/NavMode';

export default function Nav() {

    const [navMode] = useRecoilState(NavMode);

    return (
        <nav className="navbar navbar-expand-sm bg-success navbar-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
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
            </div>
        </nav>
    )
}