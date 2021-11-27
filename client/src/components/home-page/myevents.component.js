import { useEffect, useState } from 'react'
import './home-page.css'

//components
import Modal from 'react-modal';
import EventCard from "./eventcard.component"
import CreateEditEventForm from "./createEditEventForm.component"

const axios = require("axios")

export default function MyEvents(props) {
    const username = props.username

    const [events, setEvents] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    function updateMyEvents() {
        let query = { host: `${username}` }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }

    useEffect(() => {
        let query = { host: `${username}` }
        axios.get("/api/events", { params: query }).then(res => {
            setEvents(res.data)
        })
    }, [isModalOpen, username])

    return (
        <div>
            <h1 className="MyEventHeader">My Events</h1>
            <button className="AddEventButton" onClick={() => { setIsModalOpen(true) }}>Add Event</button>
            <Modal ariaHideApp={false} isOpen={isModalOpen}>
                <CreateEditEventForm username={username} setIsModalOpen={setIsModalOpen} />
            </Modal>
            <ul>
                {
                    events.map((event, idx) =>
                        <li key={idx}>
                            <EventCard updateMyEvents={updateMyEvents} key={idx} event={event} username={username} />
                        </li>)
                }
            </ul>
        </div>
    )
}