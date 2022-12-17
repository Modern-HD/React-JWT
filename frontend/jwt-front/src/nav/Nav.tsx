import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-sm bg-success navbar-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/member">member</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/board">board</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}