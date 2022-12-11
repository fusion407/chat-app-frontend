import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function User ({name, avatar}) {
    return(
        <div className="userBox">
            <h1>{name}</h1>
            <img className="avatarImage" src={avatar}></img>
        </div>
    )
}

export default User