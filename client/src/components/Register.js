import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Register.css";

const axios = require('axios')

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [response, setReponse] = useState("Response Objects")

    function validateForm() {
        let usernameValid = username.length > 0
        let passwordValid = password.length > 0
        let passwordsMatch = password == password2
        return usernameValid && passwordValid && passwordsMatch
    }

    async function handleSubmit(event) {
        const user = {
            username,
            password
        }
        await axios.post("/api/users/register", user)
        //axios post requests working, just need to see the http response so the user knows 
        //whether it was succesful
        // if sucess
        // reroute to homepage
        // if not, tell the user why
        event.preventDefault();
    }

    return (
        <div className="Register">
            <h1>{response}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password2">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Create Account
                </Button>
            </Form>
        </div>
    );
}