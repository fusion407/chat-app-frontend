import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from './Message'

function Chat({isLoggedIn, loggedInUser}) {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        username : '',
        comment : '',
    })
    // Upon loading this page, data for chat will automatically 
    // get fetched from server and appended onto page
    useEffect(() => {
        getChatData()
    }, [])
    if(!messages) return "Loading..."

    // DELETE
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

    // Fetches message data and sets state of 'messages'
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

    // Event listener which sets the state of the formData each time the input is changed
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    // When the form is submitted, a POST request is made the server
    // using data in the comment box and the username/avatar of the current
    // logged in user
    function handleSubmit(e) {
        e.preventDefault();

        // If not text was written in the comment field, return
        if(!formData.comment) return;

        fetch("https://chat-app-data.onrender.com/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key : formData.id,
                name : loggedInUser.username,
                comment : formData.comment,
                avatarURL : loggedInUser.avatarURL,
            })
        })
            .then((r) => r.json())
            .then((newMessage) =>
                console.log(newMessage),
            )
        // After data is sent to server, retrieve new chat data
        getChatData()
    }

    const messagesToDisplay = messages.map((message) => 
        <Message 
            id={message.id}
            key={message.id}
            name={message.name}
            comment={message.comment}
            avatarURL={message.avatarURL}
            deleteComment={deleteComment}
        />
    )
    // Checks if user is logged in
    if(!isLoggedIn) return <Redirect to="/login" />

    return (
        <div className="chatPage">
            <div className="chatBox">
                    <Card style={{ background: "#39395f", width: '25rem' }}>
                        <ListGroup style={{background: "#a9c25d", width: 'auto'}}variant="flush">
                            {messagesToDisplay}
                        </ListGroup>
                    </Card>
            </div>
            <div className="newComment">
                <form onSubmit={handleSubmit}>
                    <label>
                        New Comment:
                        <input 
                            type="text"
                            name="comment"
                            onChange={handleChange}
                        />
                    </label>
                    <div>
                        <button className="submitButton" type="submit">Add Comment</button>
                    </div>
                </form>
            </div>
        </div>
      );
}

export default Chat