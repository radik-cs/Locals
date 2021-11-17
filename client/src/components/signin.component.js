import React, { useState} from "react";
import "./login.css"
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function SignIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        username: true,
        password: true
    })


    async function handleSubmit(event) {
        //prevents page refresh
        event.preventDefault()
        //validate the form - mutates the errors object
        validateForm()
        //if there are errors, return from the function, the user will automatically be notified of problems
        // it would better to use a modal here
        // this is also the reason you have to hit the button twice
        if (errors.username || errors.password){
            alert("something went wrong, please try again")
            return
        }

        //check with database
        const user = {
            username,
            password
        }
        let response = await axios.post("/api/login/sign-in", user)
        //tell user the status of request
        if (response.data.success){
            alert("Logged in successfully")
            navigate(`/home/${username}`, { replace: true, state: { id: 7, color: 'green' } });
        }
        else {
            if (response.data.password)
                alert(`${response.data.password}`)
            else if (response.data.username)
                alert(`${response.data.username}`)
            else
                alert("Something went wrong, log in unsuccesful")
        }
    }

    function validateForm() {
        let errors = {}
        errors.username = username.length <= 0 ? "Username field required" : false
        errors.password = password.length <= 0 ? "Password field required" : false
        setErrors(errors)
    }


    return (
        <form className="signin-form" onSubmit={handleSubmit}>
            <div className="description">
                <h3>Sign-In</h3>
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

            <p> </p>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    );
}