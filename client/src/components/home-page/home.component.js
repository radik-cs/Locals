
import { useState } from 'react'
import { useLocation } from "react-router-dom";
import './home-page.css'

//components
import MyEvents from "./myevents.component"
//search events
//My RSVPs


export default function Home(props) {
    const location = useLocation()
    const username = location.state.username
    const [currentTab, setCurrentTab] = useState("my-events")
    const tabList = [
        {
            name: "my-events",
            label: "My Events",
            content: <MyEvents username={username} />
        },
        {
            name: "search-events",
            label: "Search Events",
            content: <h1>search events tab</h1>
        },
        {
            name: "my-rsvps",
            label: "My RSVPs",
            content: <h1>My RSVPs</h1>
        }
    ]
    return (
        <div>
            <div className = "tab-list">
                {/*header - has the tab buttons and username*/
                    tabList.map((tab, i) =>
                        <button key={i} onClick={() => setCurrentTab(tab.name)}>
                            {tab.label}
                        </button>
                    )
                }
            </div>
            <div className = "component-title">
                {/*home page body - renders the body based on the selected tab and the tabList array defined above*/
                    tabList.map((tab, i) => {
                        if (tab.name === currentTab)
                            return <div key={i}>{tab.content}</div>;
                        else
                            return null;
                    })
                }
            </div>
        </div>
    );
}