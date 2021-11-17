import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function SignUp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({
        username: true,
        password: true,
        password2: true
    })

    async function handleSubmit(event) {
        //prevents page refresh
        event.preventDefault();
        //form validation, alert the user 
        validateForm()
        //if there are errors, return from the function, the user will automatically be notified of problems
        // it would better to use a modal here
        // this is also the reason you have to hit the button twice
        if (errors.username || errors.password || errors.password2){
            alert("something went wrong, please try again")
            return
        }

        //check database
        const user = {
            username,
            password,
            password2
        }
        let response = await axios.post("/api/login/sign-up", user)
        //let user know status of req
        if (response.data.success) {
            alert("Account created successfully")
            navigate(`/home/${username}`, { replace: true, state: { id: 7, color: 'green' } });
        }
        else {
            if (response.data.password)
                alert(`${response.data.password}`)
            else if (response.data.password2 )
                alert(`${response.data.password2}`)
            else if (response.data.username)
                alert(`${response.data.username}`)
            else
                alert("Something went wrong, log in unsuccesful")
        }
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
            <div className="discription">
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