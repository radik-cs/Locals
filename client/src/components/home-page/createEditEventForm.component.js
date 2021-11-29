import { useState } from "react";
import './home-page.css'

const axios = require("axios")

export default function CreateEditEventForm(props) {
    const { event, username, setIsModalOpen, updateEvents } = props
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    const [name, setName] = useState(event ? event.name : "");
    const [location, setLocation] = useState(event ? event.location : "");
    const [startDateTime, setStartDateTime] = useState(event ? (new Date(new Date(event.startDateTime) - tzoffset)).toISOString().slice(0, -8) : "")
    const [endDateTime, setEndDateTime] = useState(event ? (new Date(new Date(event.endDateTime) - tzoffset)).toISOString().slice(0, -8) : "")
    const [description, setDescription] = useState(event ? event.description : "")
    const title = event ? "Edit Event" : "Add Event"


    function handleSubmit(e) {
        e.preventDefault()
        const query = {
            host: `${username}`,
            name,
            location,
            startDateTime,
            endDateTime,
            description
        }
        // if we are doing an update, add the event _id to the query
        if (event)
            query._id = event._id
        axios.put("/api/events", query).then(res => {
            setIsModalOpen(false)
            updateEvents()
        })
    }
    function isFormValid() {
        return +
            name.length > 0 && +
            location.length > 0 && +
            startDateTime.length > 0 && +
            description.length > 0 && +
            endDateTime.length > 0 && +
            new Date(startDateTime) < new Date(endDateTime) && +
            new Date(startDateTime) > new Date()
    }

    return (
        <div className="eventWindow">
            <button className="ExitButton" onClick={() => setIsModalOpen(false)}>Exit</button>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="eventArgument">Name:</label>
                    <input type="text" value={name} placeholder="Enter event name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className="eventArgument">Location:</label>
                    <input type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label className="eventArgument">Date/Time:</label>
                    <input type="datetime-local" value={startDateTime} placeholder="Enter the start date and time" onChange={(e) => setStartDateTime(e.target.value)} />
                </div>
                <div>
                    <label className="eventArgument">Ending Date/Time:</label>
                    <input type="datetime-local" value={endDateTime} placeholder="Enter the start date and time" onChange={(e) => setEndDateTime(e.target.value)} />
                </div>
                <div>
                    <label className="eventArgument">Description:</label>
                    <input type="text" value={description} placeholder="Enter the date and time" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <p> </p>
                <button className="ExitButton" disabled={!isFormValid()} type="submit">Submit</button>
            </form>
        </div>
    );
}



    // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    //var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8); //string format for input digestion