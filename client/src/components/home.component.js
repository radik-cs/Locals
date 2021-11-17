
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";

//components
import HomeHeader from "./homeheader.component"
import CreateEvents from "./createEvents.component"
import MyEvents from "./myevents.component"

export default function Home(props) {
    const state = useLocation();
    const username = state.pathname.split("/")[2]
    return (
        <div className="home">
            <HomeHeader username={username}/>
            <div className="event-body">
                <Routes>
                
                    <Route path="create-events" element={<CreateEvents username={username} />} />
                    
                    <Route path="my-events" element={<MyEvents username={username} />} />
                </Routes>
            </div>
        </div>

    )
}