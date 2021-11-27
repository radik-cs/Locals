import { useState } from 'react'

//components
import EventCard from "./eventcard.component"

const axios = require("axios")

export default function EventSearch(props) {
    const username = props.username
    const [search, setSearch] = useState("")
    const [events, setEvents] = useState([])

    function handleSearch(e) {
        e.preventDefault()
        let query = { search: `${search}` }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }
    function isFormValid() {
        return search.length > 0
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search Event By Name" onChange={(e) => setSearch(e.target.value)} />
                <p> </p>
                <button disabled={!isFormValid()} type="submit">Search</button>
            </form>
            <h1>events</h1>
            <ul>
                {
                    events.map((event, idx) =>
                        <li key={idx}>
                            <EventCard key={idx} event={event} username={username} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}