import { Routes, Route} from "react-router-dom";

//components
import SignIn from "./signin.component"
import SignUp from "./signup.component"
import LoginHeader from "./loginheader.components"

export default function Login() {
    return (
        <div>
            {/* header */}
            <LoginHeader />

            {/*body */}
            <div>
                <Routes>
                    <Route path="" element={<SignIn />} />
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                </Routes>
            </div>
        </div>
    );

}