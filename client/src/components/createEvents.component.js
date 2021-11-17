import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require("axios")

export default function CreateEvent(props) {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [datetime, setDateTime] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({
        name: true,
        location : true,
        datetime : true,
        descriptio: true
    })
    const username = props.username

    async function handleSubmit(e) {
        e.preventDefault()
        validateForm()
        const event = {
            username,
            name,
            location,
            datetime,
            description,
        }
        console.log(event)
        
        //validate input
        if (errors.name || errors.location || errors.datetime || errors.description)
            return
        //insert into database
        let response = await axios.post("/api/events", event)
        console.log(response)
    }

    function validateForm(){
        let errors = {}
        errors.name = name.length <= 0 ? "name field is required" : false
        errors.location = location.length <= 0 ? "location field is required" : false
        errors.datetime = datetime.length <=  0 ? "Date/time field is required" : false
        errors.description = description.length <=  0 ? "description field is required" : false
        setErrors(errors)
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
            <div className="text-danger">{errors.name}</div>

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
            <div className="text-danger">{errors.location}</div>

            <div className="form-group">
                <label>Date/Time</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the date and time"
                    value={datetime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
            </div>
            <div className="text-danger">{errors.datetime}</div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the date and time"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="text-danger">{errors.description}</div>

            <p> </p>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    );
}