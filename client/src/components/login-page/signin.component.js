import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login-page.css"
const axios = require("axios")

export default function SignIn() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        let query = { username, password }
        axios.get("/api/login", { params: query }).then(res => {
            if (res.data.success)
                navigate(`/${username}`, { state: { username: `${username}` } });
            else
                setError(res.data.message)
        })
    }
    function isFormValid() {
        return username.length > 0 && password.length > 0
    }

    return (
        <div className = "signin">
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className = "input-username">
                <label>Username</label>
                <input type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className = "input-password">
                <label>Password</label>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <p>{error}</p>
                <button disabled={!isFormValid()} type="submit">Submit</button>
            </form>
        </div>
    );
}