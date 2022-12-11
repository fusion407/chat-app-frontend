import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import User from "./User"

function Users({isLoggedIn, userData}) {

const [users, setUsers] = useState([]);

useEffect(() => {
  setUsers(userData)
}, [])
if(!users) return "Loading..."

if(!isLoggedIn) return <Redirect to="/login" />

const usersToDisplay = users.map((user) => 
<ul>
  <User 
    key={user.id}
    name={user.username}
    avatar={user.avatarURL}
  />
</ul>
)
    return (
        <div className="usersBox">
          {users ? usersToDisplay : "No users"}
        </div>
    );
  }

export default Users