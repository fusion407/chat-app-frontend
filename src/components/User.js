import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function User ({name, avatar}) {
    return(
        <div className="usersBox">
            <h1>{name}</h1>
            <div>
                <img className="avatarImage" src={avatar}></img>
            </div>
        </div>
    )
}

export default User