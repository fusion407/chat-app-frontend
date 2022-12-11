import React from 'react'

function User ({name, avatar}) {
    return(
        <div className="userBox">
            <h1>{name}</h1>
            <img className="avatarImage" src={avatar} alt="avatarImg"></img>
        </div>
    )
}

export default User