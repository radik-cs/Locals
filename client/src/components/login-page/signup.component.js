import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function SignUp() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords do not match")
            return
        }
        const user = { username, password, password2 }
        axios.post("/api/login", user).then(res => {
            if (res.data.success)
                navigate(`/${username}`, { state: { username: `${username}` } });
            else
                setError(res.data.message)
        })
    }
    function isFormValid() {
        return username.length > 0 && password.length > 0 && password2.length
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Username</label>
            <input type="username" placeholder="Choose username" onChange={(e) => setUsername(e.target.value)} />

            <label>Password</label>
            <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

            <label>Re-enter Password</label>
            <input type="password" placeholder="Re-enter password" onChange={(e) => { setPassword2(e.target.value) }} />

            <p>{error}</p>
            <button disabled={!isFormValid()} type="submit">Sign Up</button>
        </form>
    );
}