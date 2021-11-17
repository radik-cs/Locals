import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function SignUp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({})

    async function handleSubmit(event) {
        event.preventDefault();
        //form validation, alert the user 
        validateForm()
        if (errors.username || errors.password || errors.password2)
            return
        //check database
        const user = {
            username,
            password,
            password2
        }
        let response = await axios.post("/api/users/register", user)
        let success = response.data.success
        if (success)
            navigate("/home", { replace: true });
        else
            alert(`${response.data.message}`)
    }

    function validateForm() {
        let errors = {}
        errors.username = username.length <= 0 ? "Username field is required" : false
        errors.password = password.length <= 0 ? "Password field is required" : false
        errors.password2 = password !== password2 ? "Passwords must match" : false
        setErrors(errors)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class= "discription">
                <h3>Sign Up</h3>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Choose username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="text-danger">{errors.username}</div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="text-danger">{errors.password}</div>

            <div className="form-group">
                <label>Re-enter Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                    value={password2}
                    onChange={(e) => { setPassword2(e.target.value) }}
                />
            </div>
            <div className="text-danger">{errors.password2}</div>

            <p> </p>
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
    );
}