import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Message ({name, comment, image, deleteComment}) {
    return(
        <div className="chatBox" value={name}>
            <div>
                <img className="avatarImage" src={image}></img>
            </div>
            <div className="bg-dark">
                <ListGroup.Item variant="dark">{name ? name : "Anonymous"}:</ListGroup.Item>
                <ListGroup.Item variant="lightblue">{comment}</ListGroup.Item>
            </div>
            <div onClick={deleteComment} className="deleteButton">
                <button >Delete</button>
            </div>
        </div>
    )
}

export default Message