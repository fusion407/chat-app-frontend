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


function getUserData(data) {
  // fetch("https://chat-app-data.onrender.com/messages", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type" : "application/json",
  //   },
  // })
  //   .then((r) => r.json())
  //   .then((user) => setUsers(user))
  //   .catch((error) => console.log(error))



}

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
        <div>
          {users ? usersToDisplay : "No users"}
        </div>
    );
  }

export default Users