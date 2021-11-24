import { useState } from "react";

const axios = require("axios")

export default function CreateEditEventForm(props) {
    const username = props.username
    const setIsModalOpen = props.setIsModalOpen
    const id = (props.id == undefined) ? undefined: props.id

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [datetime, setDateTime] = useState("")
    const [description, setDescription] = useState("")

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
        let response = await axios.put("/api/events", event)
        if (response.data.success)
            setIsModalOpen(false)
        else
            alert(`event creation unsuccessful - ${response.data}`)
    }
    function isFormValid() {
        return name.length > 0 && location.length > 0 && datetime.length > 0 && description.length > 0
    }

    return (
        <div>
            <button onClick={()=>setIsModalOpen(false)}>Exit</button>
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
        </div>
    );
}