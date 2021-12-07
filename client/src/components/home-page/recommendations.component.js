import { useEffect, useState } from 'react'

import EventCard from "./eventcard.component"

const axios = require("axios")

export default function Recommendations(props) {
    const { username } = props
    const [events, setEvents] = useState([])

    useEffect(() => {
        let query = { username }
        axios.get("/api/login/recommendations", { params: query }).then(res => {
            setEvents(res.data)
        })
    }, [])

    function updateEvents(){
        let query = { username }
        axios.get("/api/login/recommendations", { params: query }).then(res => {
            setEvents(res.data)
        })
    }
    return (
        <div>
            <h1>Recomendations</h1>
            <ul>
                {
                    events.map((event, idx) =>
                        <li key={idx}>
                            <EventCard key={idx} username={username} event={event} updateEvents={updateEvents}/>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}