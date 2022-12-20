import React from 'react'
import defaultProfile from '../defaultProfile.png'
import ListGroup from 'react-bootstrap/ListGroup';

function Message ({id, name, comment, avatarURL, deleteComment}) {
    return(
        <div className="chatBox" value={name}>
            <div>
                <img className="avatarImage" src={avatarURL ? avatarURL : defaultProfile} alt="avatarImage"></img>
            </div>
            <div>
                <ListGroup.Item style={{background: "#f5eec2"}}>{name ? name : "Anonymous"}:</ListGroup.Item>
                <ListGroup.Item>{comment}</ListGroup.Item>
            </div>
                <button className="deleteButton" onClick={() => deleteComment(id)} >Delete</button>
        </div>
    )
}

export default Message