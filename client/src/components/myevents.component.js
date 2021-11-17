import React, { useEffect, useState} from 'react'
const axios = require("axios")


export default function MyEvents(props){
    const [events, setEvents] = useState([])
    const username = props.username


    useEffect(async () => {
        let response = await axios.post("/api/events/get-events",{username})
        console.log(response.data)
        
        
    })
    return (
        <h1>hello</h1>
    )
}