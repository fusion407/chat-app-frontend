import React from 'react'

function Home() {
    return(
        <div className="homeScreen">
            <h1>Welcome to Chat-App!</h1>
            <p>
                This is a single page application created with 
                ReactJS.
            </p>
            <p>
                The purpose of this project is to learn React, 
                and using it to perform basic CRUD operations 
                using Json-server.
            </p>
            <p>
                In order to create a new profile, input your username
                and click 'Create Account'. You may then log in and then
                go to the Forum page to begin chatting!
            </p>

            <p>
                If you'd rather test one of the pre-made profiles, 
                use this login:
            </p>
            <p>username: Zuko  -  password:  zukohere</p>
        </div>
    )
}

export default Home;