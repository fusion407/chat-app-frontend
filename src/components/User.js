import React from 'react'
import defaultProfile from '../defaultProfile.png'

function User ({name, avatar}) {

    return(
        <div>
            <ul className="userBox">
                <h1>{name}</h1>
                <img className="avatarImage" src={avatar ? avatar : defaultProfile} alt="avatarImg"></img>
            </ul>
        </div>
    )
}


export default User