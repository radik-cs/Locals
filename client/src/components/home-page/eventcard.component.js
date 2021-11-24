export default function EventCard(props) {
    return (
        <div>
            <ul>
                <li>Host: {props.event.host}</li>
                <li>Name: {props.event.name}</li>
                <li>Location: {props.event.location}</li>
                <li>Date and Time: {props.event.datetime}</li>
                <li>Description: {props.event.description}</li>
            </ul>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}