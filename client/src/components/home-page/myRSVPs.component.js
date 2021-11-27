import { useEffect, useState } from 'react'

import EventCard from "./eventcard.component"

const axios = require('axios')


export default function MyRSVPs(props) {
    const username = props.username
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get("/api/events", {params:{ RSVPs: username }}).then(res => {
            setEvents(res.data)
        })
    }, [username])

    return (
        <div>
            <h1>My RSVPs</h1>
            {
                events.map((event, idx) =>
                    <li key={idx}>
                        <EventCard key={idx} event={event} username={username} />
                    </li>
                )
            }
        </div>
    )
}