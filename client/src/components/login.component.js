import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//components
import SignIn from "./signin.component"
// import SignUp from "./signup.component"
import LoginHeader from "./loginheader.components"



export default function Login() {
    return (
        <div>
            <LoginHeader />
            <div className="body">
                <Routes>
                </Routes>
                <SignIn />
            </div>

        </div>
    );

}