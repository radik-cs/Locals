import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css"
//components
import SignIn from "./signin.component"
import SignUp from "./signup.component"
import LoginHeader from "./loginheader.component"



export default function Login() {
    return (
        <div className="Login">
            <LoginHeader />
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Routes>
                        <Route path="" element={<SignIn />} />
                        <Route path="sign-in" element={<SignIn />} />
                        <Route path="sign-up" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </div>
    );

}