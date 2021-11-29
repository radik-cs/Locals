import { useState } from 'react'
import './home-page.css'

//components
import CreateEditEventForm from "./createEditEventForm.component"
import Modal from 'react-modal';

const axios = require("axios")
const qr = require("qrcode")

export default function EventCard(props) {
    const { username, event, updateEvents } = props
    const url = `${window.location.hostname}:5000/api/events/`
    
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
            RSVPEvent = <button onClick={handleRSVP}>RSVP</button>
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


    // //conditional rendering of editEvent, deleteEvent, and RSVPEvent capailities
    // var editEvent = undefined
    // var deleteEvent = undefined
    // var RSVPEvent = undefined
    // var QRCodeEvent = undefined
    // // if the current user is the host of the event
    // if (username === event.host) {
    //     editEvent = <button className="EventCardButton" onClick={handleEdit}>Edit</button>
    //     deleteEvent = <button className="EventCardButton" onClick={handleDelete}>Delete</button>
    // }
    // // if the current user is not the host of the event
    // // else {
    // //     // is called from MyRSVPs or is from a searchEvent result that is NOT the user's event
    // //     // - dislay RSVP button, RSVP'd - event not started, or QR code
    // //     //display RSVP button or not
    // //     if (!event.RSVPs.includes(username))
    // //         RSVPEvent = <button onClick={handleRSVP}>RSVP</button>
    // //     else {
    // //         RSVPEvent = <p>RSVP'd</p>
    // //         let dt = new Date()
    // //         let start = new Date(event.startDateTime)
    // //         let end = new Date(event.endDateTime)
            // if (dt > start && dt < end) {
            //     qr.toDataURL(`${url}${props.event._id}-${username}`, (err, src) => {
            //         let style = {width: '100px', height: '100px'}
            //         QRCodeEvent = <img alt="qr code" style={style} id='base64image'src={src}  /> 
            //     });
            // }
    // //     }
    // // }
    // function handleRSVP() {
    //     if (!event.RSVPs.includes(username)) {
    //         axios.put("/api/events", { event: props.event, guest: `${username}` }).then(res => {
    //             event.RSVPs.push(username)
    //             //forces the page to re render
    //             setRSVPFlag(!RSVPFlag)
    //         })
    //     }
    // }
    // // function handleEdit() {
    // //     setIsModalOpen(true)
    // // }
    // // function handleDelete() {
    // //     axios.delete("/api/events", { params: props.event }).then(res => {
    // //         //updateMyEvents()
    // //         let newEvents = events.splice(key, 1)
    // //         setEvents(newEvents)
    // //     })
    // // }