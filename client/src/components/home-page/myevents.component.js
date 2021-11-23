import { useEffect, useState } from 'react'

//components
import EventCard from "./eventcard.component"

const axios = require("axios")

export default function MyEvents(props) {
    const [events, setEvents] = useState([])
    const username = props.username

    useEffect(() => {
        axios.post("/api/events/get-events", { username }).then(response => {
            setEvents(response.data)
        })
    }, [username])
    //there is an error with the key property
    return (
        <ul>
            {events.map((event, idx) => <li key={idx}><EventCard key={idx} event={event} /></li>)}
        </ul>
    )
}