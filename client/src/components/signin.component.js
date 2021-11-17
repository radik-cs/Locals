import React, { useState } from "react";
import "./login.css"
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function SignIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleSubmit(event) {
        event.preventDefault()
        const user = {
            username,
            password
        }
        //validate input
        //if valid, ping database
        //if not valid, let user know
        let response = await axios.post("/api/users/login", user)
        let success = response.data.success
        // let do better than a chrome aler
        if (success)
            navigate("/home", {replace : true});
        else
            alert(`${response.data.message}`)
    }

    

    return (
        <form class = "signin-form" onSubmit={handleSubmit}>
            <div class = "discription">
                <h3>Login</h3>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

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

            <p> </p>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    );
}