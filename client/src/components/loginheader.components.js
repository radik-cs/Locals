
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function LoginHeader() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Locals</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/login/sign-in"}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/login/sign-up"}>Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}