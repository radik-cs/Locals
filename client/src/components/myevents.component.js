import React, { useEffect, useState } from 'react'

import EventCard from "./eventcard.component"
const axios = require("axios")

//componenets



export default function MyEvents(props) {
    const [events, setEvents] = useState([])
    const username = props.username


    useEffect(async () => {
        let response = await axios.post("/api/events/get-events", { username })

        console.log(response.data)
        console.log(response.data)
        setEvents(response.data)
    }, [])
    return (
        <div>
            <ul>
                {events.map(event => <li><EventCard event={event} /></li>)}
            </ul>
        </div>
    )
}