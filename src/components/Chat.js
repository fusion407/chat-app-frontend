import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from './Message'

function Chat() {
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
        />
    )
    return (
        <div className="chatBox">
            <Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                    {messagesToDisplay}
                </ListGroup>

            </Card>
        </div>
      );
}

export default Chat