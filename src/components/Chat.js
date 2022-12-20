import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from './Message'

function Chat({isLoggedIn, loggedInUser, messages, setMessages}) {
    const [formData, setFormData] = useState({
        username : '',
        comment : '',
    })
    useEffect(() => {
        fetchChatData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if(!messages) return "Loading..."

    if(!isLoggedIn) return <Redirect to="/login" />

    async function fetchChatData() {
        await fetch("https://chat-app-data.onrender.com/messages", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            },
        })
            .then((r) => r.json())
            .then((message) => {
                setMessages(message)             
            })
            .catch((error) => console.log(error))
    }
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
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if(!formData.comment) return;

        await fetch("https://chat-app-data.onrender.com/messages", {
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
            .then(() => {
                e.target[0].value = '';
                return fetchChatData()
            })
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

    return (
        <div className="chatPage">
            <div className="chatBox">
                    <Card style={{ background: "#9CAEA9", width: '25rem' }}>
                        <ListGroup style={{background: "#6F6866", width: 'auto'}}variant="flush">
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