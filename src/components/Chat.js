import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from './Message'

function Chat({isLoggedIn, userData}) {
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

    const deleteComment = async (id) => {
        console.log(id)
        fetch(`https://chat-app-data.onrender.com/messages/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
        })
            .then((res) => {
                if(res.status !== 200) {
                    return;
                } else {
                    setMessages(
                        messages.filter((message) => {
                            return message.id !== id;
                        })
                    )
                }
            })  
            .catch((error) => console.log(error))
  
    }

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
                key : formData.id,
                name : userData.username,
                comment : formData.comment,
                image : userData.avatar,
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
            id={message.id}
            key={message.id}
            name={message.name}
            comment={message.comment}
            image={message.image}
            deleteComment={deleteComment}
        />
    )
    if(!isLoggedIn) return <Redirect to="/login" />

    return (
        <div className="chatPage">
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