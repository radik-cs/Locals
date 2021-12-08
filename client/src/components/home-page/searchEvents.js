import { useState } from 'react'

//components
import EventCard from "./eventcard.component"
import City from "./city.png"

const axios = require("axios")

export default function EventSearch(props) {
    const username = props.username
    const [search, setSearch] = useState("")
    const [events, setEvents] = useState([])

    function handleSearch(e) {
        e.preventDefault()
        let query = { name: `${search}` }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }
    function isFormValid() {
        return search.length > 0
    }
    function updateEvents() {
        let query = { name: `${search}` }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }

    return (
        <div>
            <div className="ImageHeader">
                <img className="Banner" src={City} />
                <div className="HeaderObject">
                    <h1 className="EventSearchHeader">Search Events</h1>
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <input className="searchBar" type="text" value={search} placeholder="Search Event By Name" onChange={(e) => setSearch(e.target.value)} />
                <button className="searchButton" disabled={!isFormValid()} type="submit">Search</button>
            </form>
            <ul>
                {
                    events.map((event, idx) =>
                        <li key={idx}>
                            <EventCard key={idx} username={username} event={event} updateEvents={updateEvents} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}