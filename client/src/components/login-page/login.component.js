import { useState } from 'react'

//components
import SignIn from "./signin.component"
import SignUp from "./signup.component"

export default function Login(props) {
    const [currentTab, setCurrentTab] = useState("signin")
    const tabList = [
        {
            name: "signin",
            label: "Sign In",
            content: <SignIn />
        },
        {
            name: "signup",
            label: "Sign Up",
            content: <SignUp />
        }
    ]
    return (
        <div>
            <h1>Locals</h1>
            {/*header - tab buttons - renders the tab buttons based on the tabList array defined above*/
                tabList.map((tab, i) =>
                    <button key={i} onClick={() => setCurrentTab(tab.name)}>
                        {tab.label}
                    </button>
                )
            }
            {/*login page body - renders the body based on the selected tab and the tabList array defined above*/
                tabList.map((tab, i) => {
                    if (tab.name === currentTab)
                        return <div key={i}>{tab.content}</div>;
                    else
                        return null;
                })
            }
        </div>
    );

}