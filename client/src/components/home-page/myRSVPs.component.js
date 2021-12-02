import { useEffect, useState } from 'react'

import EventCard from "./eventcard.component"
import Fireworks from "./fireworks.png"

const axios = require('axios')


export default function MyRSVPs(props) {
    const { username } = props

    const [events, setEvents] = useState([])

    useEffect(() => {
        let query = { RSVPs: username }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }, [username])
    function updateEvents() {
        let query = { RSVPs: username }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }

    return (
        <div>
            <div className="ImageHeader">
                <img className="Banner" src={Fireworks}/>
                <div className="HeaderObject">
                    <h1 className="RSVPHeader">My RSVPs</h1>
                </div>
            </div>
            {
                events.map((event, idx) =>
                    <li key={idx}>
                        <EventCard key={idx} username={username} event={event} updateEvents={updateEvents} />
                    </li>
                )
            }
        </div>
    )
}