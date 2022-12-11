import React from 'react'

function Home() {
    return(
        <div className="homeScreen">
            <h1>Welcome to Chat-App!</h1>
            <p>
                This is a work-in-progress single page application coded with 
                ReactJS.
            </p>
            <p>
                The purpose of this project is to learn React, 
                and using it to perform basic CRUD operations 
                using JSON Server.
            </p>
            <p>
                In order to create a new profile, make an attempt 
                to login and please include the URL to the avatar 
                photo you would like to use, then try logging in 
                again.
            </p>
            <p>
                (do not submit a username/password you use often)
            </p>
            <p>
                (unless you reallllly trust me)
            </p>
            <p>
                If you'd rather test one of the pre-made profiles, 
                use these credentials:
            </p>
            <p>username: Zuko  -  password:  zukohere</p>
        </div>
    )
}

export default Home;