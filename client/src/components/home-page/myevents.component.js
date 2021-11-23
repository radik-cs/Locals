import React, { useEffect, useState } from 'react'

//components
import EventCard from "./eventcard.component"
import "./myevents.css"
const axios = require("axios")



export default function MyEvents(props) {
    const [events, setEvents] = useState([])
    const username = props.username

    useEffect(async () => {
        let response = await axios.post("/api/events/get-events", { username })
        setEvents(response.data)
    }, [])
    //there is an error with the key property
    return (
        <div class = "my-events-card">
            <ul class="listevents"> 
                {events.map((event,idx) => <li class= "my-event" ><EventCard key={idx} event={event} /></li>)}
            </ul>
        </div>
    )
}