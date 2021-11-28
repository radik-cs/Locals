import { useState } from "react";
import './home-page.css'

const axios = require("axios")

export default function CreateEditEventForm(props) {
    // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    //var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8); //string format for input digestion
    const [name, setName] = useState(props.event === undefined ? "" : props.event.name);
    const [location, setLocation] = useState(props.event === undefined ? "" : props.event.location);
    const [startDateTime, setStartDateTime] = useState(props.event === undefined ? "" : props.event.startDateTime.slice(0,-1))
    const [endDateTime, setEndDateTime] = useState(props.event === undefined ? "" : props.event.endDateTime.slice(0,-1))
    const [description, setDescription] = useState(props.event === undefined ? "" : props.event.description)

    
    const setIsModalOpen = props.setIsModalOpen
    const username = props.username ? props.username : props.event.host
    const title = props.event === undefined ? "Create Event" : "Edit Event"

    function handleSubmit(e) {
        e.preventDefault()
        //api request
        let query = {}
        const event = {
            host: `${username}`,
            name,
            location,
            startDateTime,
            endDateTime,
            description
        }
        if (props.event)
            event._id = props.event._id
        query.event = event
        axios.put("/api/events", query).then(res => {
            if (res.data.success) {
                if (props.updateMyEvents)
                    props.updateMyEvents()
                setIsModalOpen(false)
            }
            else
                alert(`event creation unsuccessful - ${res.data}`)
        })
    }
    function isFormValid() {
        return +
        name.length > 0 && +
        location.length > 0 && +
        startDateTime.length > 0 && +
        description.length > 0 && +
        endDateTime.length > 0 && +
        new Date(startDateTime) < new Date(endDateTime);
    }

    return (
        <div className="eventWindow">
            <button className = "ExitButton" onClick={() => setIsModalOpen(false)}>Exit</button>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className = "eventArgument">Name:</label>
                    <input type="text" value={name} placeholder="Enter event name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className = "eventArgument">Location:</label>
                    <input type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label className = "eventArgument">Date/Time:</label>
                    <input type="datetime-local" value={startDateTime} placeholder="Enter the start date and time" onChange={(e) => setStartDateTime(e.target.value)} />
                </div>
                <div>
                    <label className = "eventArgument">Ending Date/Time:</label>
                    <input type="datetime-local" value={endDateTime} placeholder="Enter the start date and time" onChange={(e) => setEndDateTime(e.target.value)} />
                </div>
                <div>
                    <label className = "eventArgument">Description:</label>
                    <input type="text" value={description} placeholder="Enter the date and time" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <p> </p>
                <button className = "ExitButton" disabled={!isFormValid()} type="submit">Submit</button>
            </form>
        </div>
    );
}