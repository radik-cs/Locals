import { useEffect, useState } from 'react'

import EventCard from "./eventcard.component"
import Boat from "./boat.jpg"

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
            <div className="ImageHeader">
                <img className="Banner" src={Boat}/>
                <div className="HeaderObject">
                    <h1 className="RecommendationsHeader">Recommendations</h1>
                </div>
            </div>
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