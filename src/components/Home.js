import React from 'react'
import Alert from 'react-bootstrap/Alert';


function Home() {
    return(
        <div>
            <h1>Welcome to Chat-App!</h1>
            
            <h2>Click <Alert.Link href="join-chat">here</Alert.Link> to join chat</h2>
            <h2>Click <Alert.Link href="create-chat">here</Alert.Link> to create a chat</h2>
        </div>
    )
}

export default Home;