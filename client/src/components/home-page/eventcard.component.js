import { useState } from 'react'
import './home-page.css'

//components
import CreateEditEventForm from "./createEditEventForm.component"
import Modal from 'react-modal';

const axios = require("axios")
const qr = require("qrcode")

export default function EventCard(props) {
    const username = props.username
    const event = props.event
    const startTime = new Date(props.event.startDateTime)
    const endTime = new Date(props.event.endDateTime)
    const url = "localhost:5000/api/events/"

    const updateMyEvents = props.updateMyEvents
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [RSVPFlag, setRSVPFlag] = useState(false)


    //conditional rendering of editEvent, deleteEvent, and RSVPEvent capailities
    var editEvent = undefined
    var deleteEvent = undefined
    var RSVPEvent = undefined
    var QRCodeEvent = undefined
    // if the current user is the host of the event
    if (username === event.host) {
        editEvent = <button className="EventCardButton" onClick={handleEdit}>Edit</button>
        deleteEvent = <button className="EventCardButton" onClick={handleDelete}>Delete</button>
    }
    // if the current user is not the host of the event
    else {
        // is called from MyRSVPs or is from a searchEvent result that is NOT the user's event
        // - dislay RSVP button, RSVP'd - event not started, or QR code
        //display RSVP button or not
        if (!event.RSVPs.includes(username))
            RSVPEvent = <button onClick={handleRSVP}>RSVP</button>
        else {
            RSVPEvent = <p>RSVP'd</p>
            let dt = new Date()
            if (dt > startTime && dt < endTime) {
                qr.toDataURL(`${url}${props.event._id}-${username}`, (err, src) => {
                    let style = {width: '100px', height: '100px'}
                    QRCodeEvent = <img style={style} id='base64image'src={src}  /> 
                });
            }
        }
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
                <li>Start Date and Time: {(new Date(props.event.startDateTime)).toString().slice(0, -36)}</li>
                <li>End Date and Time: {(new Date(props.event.endDateTime)).toString().slice(0, -36)}</li>
                <li>Description: {props.event.description}</li>
            </ul>
            {editEvent}
            {deleteEvent}
            {RSVPEvent}
            {QRCodeEvent}
        </div>
    )
}