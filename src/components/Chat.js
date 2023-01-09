import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageList from "./MessageList"

function Chat({isLoggedIn, loggedInUser, messages, setMessages}) {
    
    const [formData, setFormData] = useState({
        username : '',
        comment : '',
    })


    if(!isLoggedIn) return <Redirect to="/login" />

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
            .then((message) => {
                setMessages((messages) => [...messages, message])
            })
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


    return (
        <div className="chatPage">
            <div className="chatBox">
                    <Card style={{ background: "rgba(200, 155, 183, 0.4)", width: '25rem' }}>
                        <ListGroup style={{background: "rgba(145, 155, 183, 0.2)", width: 'auto'}}>
                            <MessageList 
                                messages={messages}
                                deleteComment={deleteComment}
                            />
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