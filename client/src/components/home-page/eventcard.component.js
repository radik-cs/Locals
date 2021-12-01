import { useState } from 'react'
import './home-page.css'

//components
import CreateEditEventForm from "./createEditEventForm.component"
import Modal from 'react-modal';

const axios = require("axios")
const qr = require("qrcode")

export default function EventCard(props) {
    const { username, event, updateEvents } = props
    const url = `http://${window.location.hostname}:5000/api/events/`
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    //conditional rendering of buttons
    var editEvent = undefined
    var deleteEvent = undefined
    var RSVPEvent = undefined
    var QRCodeEvent = undefined
    if (username === event.host) {//if the host of the event is the current user - display the edit and delete buttons
        editEvent = <button className="EventCardButton" onClick={handleEdit}>Edit</button>
        deleteEvent = <button className="EventCardButton" onClick={handleDelete}>Delete</button>
    }
    else { // the current user is not the host
        //the user is not on the RSVP list - display the RSVP button
        if (!event.RSVPs.includes(username))
            RSVPEvent = <button className="RSVPButton" onClick={handleRSVP}>RSVP</button>
        // the user is on the RSVP list
        else {
            let dt = new Date()
            let start = new Date(event.startDateTime)
            let end = new Date(event.endDateTime)
            // if the event is current happening - display the qr code
            if (dt > start && dt < end) {
                qr.toDataURL(`${url}${props.event._id}-${username}`, (err, src) => {
                    let style = { width: '100px', height: '100px' }
                    QRCodeEvent = <img alt="qr code" style={style} id='base64image' src={src} />
                });
            }
            // if the event is not currently happening - display RSVP'd, event has not begun
            else
                RSVPEvent = <p>RSVP'd - Outside of event hours</p>
        }
    }


    //button handlers
    function handleEdit() {
        setIsModalOpen(true)
    }
    function handleDelete() {
        axios.delete("/api/events", { params: event }).then(res => {
            updateEvents()
        })
    }
    function handleRSVP() {
        event.guest = username
        axios.put("/api/events", event).then(res => {
            updateEvents()
        })
    }


    return (
        <div className="eventCard">
            <Modal ariaHideApp={false} isOpen={isModalOpen}>
                <CreateEditEventForm event={event} username={username} setIsModalOpen={setIsModalOpen} updateEvents={updateEvents}/>
            </Modal>
            <ul className="eventList">
                <li>Host: {event.host}</li>
                <li>Name: {event.name}</li>
                <li>Location: {event.location}</li>
                <li>Start Date and Time: {(new Date(event.startDateTime)).toString().slice(0, -36)}</li>
                <li>End Date and Time: {(new Date(event.endDateTime)).toString().slice(0, -36)}</li>
                <li>Description: {event.description}</li>
            </ul>
            {editEvent}
            {deleteEvent}
            {RSVPEvent}
            {QRCodeEvent}
        </div>
    )
}