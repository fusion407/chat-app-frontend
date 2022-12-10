import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function User ({name, image}) {
    return(
        <div className="chatBox">
            <div>
                <img className="avatarImage" src={image}></img>
            </div>
            <div className="bg-dark">
                <ListGroup.Item variant="dark">{name ? name : "Anonymous"}</ListGroup.Item>
            </div>
        </div>
    )
}

export default User