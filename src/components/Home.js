import React from 'react'
import Alert from 'react-bootstrap/Alert';


function Home() {
    return(
        <div className="homeScreen">
            <h1>Welcome to Chat-App!</h1>
            <p>
                This is a work in progress application
                which simply allows users to do as the
                title says, chat!
            </p>
            <p>
                Make sure you are logged in before chatting
            </p>
        </div>
    )
}

export default Home;