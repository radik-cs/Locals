import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function CreateEvent() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [datetime, setDateTime] = useState("")
    const [description, setDescription] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const event = {
            name,
            location,
            datetime,
            description,
        }
        console.log(name)
        console.log(location)
        //validate input
        //if valid, ping database
        //if not valid, let user know
        // let response = await axios.post("/api//login", user)
        // let success = response.data.success
        // // let do better than a chrome aler
        // if (success)
        //     navigate("/home", {replace : true});
        // else
        //     alert(`${response.data.message}`)
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Event</h3>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter event name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <p> </p>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    );
}