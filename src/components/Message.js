import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Message ({name, comment, image}) {
    return(
        <div className="chatBox">
            <div>
                <img className="avatarImage" src={image}></img>
            </div>
            <div className="bg-dark">
                <ListGroup.Item variant="dark">{name ? name : "Anonymous"}:</ListGroup.Item>
                <ListGroup.Item variant="lightblue">{comment}</ListGroup.Item>
            </div>

        </div>
    )
}

export default Message