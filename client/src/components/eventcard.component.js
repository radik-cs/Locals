export default function EventCard(props) {
    return (
        <div>
            <ul>
                <li>Event Name: {props.event.name}</li>
                <li>Event Location: {props.event.location}</li>
                <li>Event Date and Time: {props.event.datetime}</li>
                <li>Event Description: {props.event.description}</li>
            </ul>
        </div>
    )
}