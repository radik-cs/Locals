import { useState } from 'react'
import './home-page.css'

//components
import CreateEditEventForm from "./createEditEventForm.component"
import Modal from 'react-modal';

const axios = require("axios")

export default function EventCard(props) {
    const username = props.username
    const event = props.event
    const updateMyEvents = props.updateMyEvents
    const [isModalOpen, setIsModalOpen] = useState(false)

    //conditional rendering of the edit and delete buttons, only render if the current user is the host of the event
    var editButton = undefined
    var deleteButton = undefined
    var RSVPbutton = undefined
    if (username === event.host){
        editButton = <button onClick={handleEdit}>Edit</button>
        deleteButton = <button onClick={handleDelete}>Delete</button>
    }
    else
        RSVPbutton = <button>RSVP</button>

    function handleEdit() {
        setIsModalOpen(true)
    }
    function handleDelete() {
        axios.delete("/api/events", { params: props.event }).then(res => {
            updateMyEvents()
        })
    }

    return (
        <div className="eventCard">
            <Modal ariaHideApp={false} isOpen={isModalOpen}>
                <CreateEditEventForm updateMyEvents={updateMyEvents} event={props.event} setIsModalOpen={setIsModalOpen} />
            </Modal>
            <ul className="eventList">
                <li>Host: {props.event.host}</li>
                <li>Name: {props.event.name}</li>
                <li>Location: {props.event.location}</li>
                <li>Date and Time: {props.event.datetime}</li>
                <li>Description: {props.event.description}</li>
            </ul>
            {editButton}
            {deleteButton}
            {RSVPbutton}
        </div>
    )
}