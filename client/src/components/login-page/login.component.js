import { useState } from 'react'

//components
import SignIn from "./signin.component"
import SignUp from "./signup.component"

export default function Login(props) {
    //states
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
            {/* login page header - contains the tab buttons*/}
            <div>
                <h1>Locals</h1>
                {/*tab buttons*/
                    tabList.map((tab, i) =>
                        <button key={i} onClick={() => setCurrentTab(tab.name)}>
                            {tab.label}
                        </button>
                    )
                }
            </div>
            {/* login page body - contains the tab body*/}
            <div>
                {
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