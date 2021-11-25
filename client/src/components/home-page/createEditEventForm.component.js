import { useState } from "react";
import './home-page.css'

const axios = require("axios")

export default function CreateEditEventForm(props) {
    const [name, setName] = useState(props.event === undefined ? "" : props.event.name);
    const [location, setLocation] = useState(props.event === undefined ? "" : props.event.location);
    const [datetime, setDateTime] = useState(props.event === undefined ? "" : props.event.datetime)
    const [description, setDescription] = useState(props.event === undefined ? "" : props.event.description)
    const setIsModalOpen = props.setIsModalOpen
    const username = props.username ? props.username : props.event.host
    const title = props.event === undefined ? "Create Event" : "Edit Event"

    async function handleSubmit(e) {
        e.preventDefault()
        //api request
        const event = {
            host: `${username}`,
            name,
            location,
            datetime,
            description
        }
        if (props.event)
            event._id = props.event._id
        let response = await axios.put("/api/events", event)
        if (response.data.success){
            if (props.updateMyEvents)
                props.updateMyEvents()
            setIsModalOpen(false)
        }
        else
            alert(`event creation unsuccessful - ${response.data}`)
    }
    function isFormValid() {
        return name.length > 0 && location.length > 0 && datetime.length > 0 && description.length > 0
    }

    return (
        <div className = "eventWindow">
            <button onClick={() => setIsModalOpen(false)}>Exit</button>
            <form onSubmit={handleSubmit}>
                <h3>{title}</h3>

                <label>Name</label>
                <input type="text" value={name} placeholder="Enter event name" onChange={(e) => setName(e.target.value)} />

                <label>Location</label>
                <input type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />

                <label>Date/Time</label>
                <input type="text" value={datetime} placeholder="Enter the date and time" onChange={(e) => setDateTime(e.target.value)} />

                <label>Description</label>
                <input type="text" value={description} placeholder="Enter the date and time" onChange={(e) => setDescription(e.target.value)} />

                <p> </p>
                <button disabled={!isFormValid()} type="submit">Submit</button>
            </form>
        </div>
    );
}