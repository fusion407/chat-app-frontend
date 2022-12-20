import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import User from "./User"

function Users({isLoggedIn, userData}) {

  const [users, setUsers] = useState([]);

  // On page load, set 'users' state to 'userData's username and avatarURL
  useEffect(() => {
    setUsers(userData)
  }, [userData])
  if(!users) return "Loading..."

  // Checks to see if user is logged in
  if(!isLoggedIn) return <Redirect to="/login" />

  const usersToDisplay = users.map((user) => 
      <User 
        key={user.id}
        name={user.username}
        avatar={user.avatarURL}
   />
  )
    return (
        <div className="usersBox">
          {users ? usersToDisplay : "No users"}
        </div>
    );
  }

export default Users