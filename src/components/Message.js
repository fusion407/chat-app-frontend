import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Message ({id, name, comment, avatarURL, deleteComment}) {
    return(
        <div className="chatBox" value={name}>
            <div>
                <img className="avatarImage" src={avatarURL}></img>
            </div>
            <div className="bg-dark">
                <ListGroup.Item variant="primary">{name ? name : "Anonymous"}:</ListGroup.Item>
                <ListGroup.Item variant="light">{comment}</ListGroup.Item>
            </div>
            <div className="deleteButton">
                <button onClick={() => deleteComment(id)} >Delete</button>
            </div>
        </div>
    )
}

export default Message