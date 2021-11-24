import { useEffect, useState } from 'react'

//components
import Modal from 'react-modal';
import EventCard from "./eventcard.component"
import CreateEditEventForm from "./createEditEventForm.component"

const axios = require("axios")

export default function MyEvents(props) {
    const username = props.username

    const [events, setEvents] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        axios.get("/api/events", { host: `${username}` }).then(response => {
            setEvents(response.data)
        })
    }, [username, isModalOpen])

    return (
        <div>
            <h1>My Events</h1>
            <button onClick={() => { setIsModalOpen(true) }}>Add Event</button>
            <Modal ariaHideApp={false} isOpen={isModalOpen}>
                <CreateEditEventForm username={username} setIsModalOpen={setIsModalOpen} />
            </Modal>
            <ul>
                {
                    events.map((event, idx) =>
                        <li key={idx}>
                            <EventCard key={idx} event={event} />
                        </li>)
                }
            </ul>
        </div>
    )
}