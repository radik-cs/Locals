import { useState } from "react";
const axios = require("axios")

export default function CreateEvent(props) {
    //state defintions
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [datetime, setDateTime] = useState("")
    const [description, setDescription] = useState("")
    //extract the component properties for ease of access
    const username = props.username

    async function handleSubmit(e) {
        e.preventDefault()
        //validate input

        //api request
        const event = {
            username,
            name,
            location,
            datetime,
            description
        }
        let response = await axios.post("/api/events", event)
        if (response.data.success) {
            props.setCurrentTab("my-events")
        }
        else {
            alert("event creation unsuccessful")
        }
    }

    function isFormValid() {
        return name.length > 0 && location.length > 0 && datetime.length > 0 && description.length > 0
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Event</h3>

            <label>Name</label>
            <input type="text" placeholder="Enter event name" onChange={(e) => setName(e.target.value)} />

            <label>Location</label>
            <input type="text" placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />

            <label>Date/Time</label>
            <input type="text" placeholder="Enter the date and time" onChange={(e) => setDateTime(e.target.value)} />

            <label>Description</label>
            <input type="text" placeholder="Enter the date and time" onChange={(e) => setDescription(e.target.value)} />

            <p> </p>
            <button disabled={!isFormValid()} type="submit">Submit</button>
        </form>
    );
}