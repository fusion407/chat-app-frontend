import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from './Message'

function Chat({isLoggedIn}) {
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        name : '',
        comment : '',
    })
    useEffect(() => {
        getChatData()
    }, [])
    if(!messages) return "Loading..."

    console.log(messages)

    function getChatData() {
        fetch("https://chat-app-data.onrender.com/messages", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            },
        })
            .then((r) => r.json())
            .then((messages) => setMessages(messages))
            .catch((error) => console.log(error))
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(!formData.comment) return;
        fetch("https://chat-app-data.onrender.com/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name : formData.name,
                comment : formData.comment,
            })
        })
            .then((r) => r.json())
            .then((newMessage) =>
                console.log(newMessage),

            )
        getChatData()
    }
    history.push("/chat")

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
        <div>
            <div className="chatBox">
                <div>
                    <Card style={{ background: "black", width: '30rem' }}>
                        <ListGroup style={{background: "#1c2a46", width: 'auto'}}variant="flush">
                            {messagesToDisplay}
                        </ListGroup>
                    </Card>
                </div>
            </div>
            <div className="newComment">
                <form onSubmit={handleSubmit}>
                    <label>
                        New Comment:
                        <input 
                            type="text"
                            name="comment"
                            // value={formData.comment}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </div>
      );
}

export default Chat