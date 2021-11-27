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
    const [RSVPFlag, setRSVPFlag] = useState(false)


    //conditional rendering of editEvent, deleteEvent, and RSVPEvent capailities
    var editEvent = undefined
    var deleteEvent = undefined
    var RSVPEvent = undefined
    if (username === event.host) {
        //called from myEvents component or is a searchEvent result that is the user's event  - should display edit/delete buttton
        editEvent = <button className="EventCardButton" onClick={handleEdit}>Edit</button>
        deleteEvent = <button className="EventCardButton" onClick={handleDelete}>Delete</button>
    }
    else {
        // is called from MyRSVPs or is from a searchEvent result that is NOT the user's event
        // - dislay RSVP button, RSVP'd - event not started, or QR code
        if (!event.RSVPs.includes(username))
            RSVPEvent = <button onClick={handleRSVP}>RSVP</button>
        else
            RSVPEvent = <p>RSVP'd</p>
    }

    function handleRSVP() {
        if (!event.RSVPs.includes(username)) {
            axios.put("/api/events", { event: props.event, guest: `${username}` }).then(res => {
                event.RSVPs.push(username)
                //forces the page to re render
                setRSVPFlag(!RSVPFlag)
            })
        }
    }
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
            {editEvent}
            {deleteEvent}
            {RSVPEvent}
        </div>
    )
}