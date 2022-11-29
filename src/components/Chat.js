import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from './Message'

function Chat({isLoggedIn}) {

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/messages")
            .then((r) => r.json())
            .then((messages) => setMessages(messages));
    }, [])
    if(!messages) return "Loading..."

    console.log(messages)

    const messagesToDisplay = messages.map((message) => 
        <Message 
            key={message.id}
            name={message.name}
            comment={message.comment}
            image={message.image}

        />
    )
    // if(!isLoggedIn) return <Redirect to="/login" />

    return (
        <div className="chatBox">
            <Card style={{ background: "black", width: '30rem' }}>
                <ListGroup style={{background: "#1c2a46", width: 'auto'}}variant="flush">
                    {messagesToDisplay}
                </ListGroup>

            </Card>
        </div>
      );
}

export default Chat