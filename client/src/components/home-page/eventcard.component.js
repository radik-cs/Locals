import { useState } from 'react'
import './home-page.css'

//components
import CreateEditEventForm from "./createEditEventForm.component"
import Modal from 'react-modal';

export default function EventCard(props) {
    const updateMyEvents = props.updateMyEvents
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleEdit() {
        setIsModalOpen(true)
        console.log("handle edit")
    }
    function handleDelete() {
        console.log("handle delete")
    }

    return (
        <div className = "eventCard">
            <Modal ariaHideApp={false} isOpen={isModalOpen}>
                <CreateEditEventForm updateMyEvents={updateMyEvents} event={props.event} setIsModalOpen={setIsModalOpen} />
            </Modal>
            <ul>
                <li>Host: {props.event.host}</li>
                <li>Name: {props.event.name}</li>
                <li>Location: {props.event.location}</li>
                <li>Date and Time: {props.event.datetime}</li>
                <li>Description: {props.event.description}</li>
            </ul>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}