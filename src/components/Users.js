import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import User from "./User"

function Users({isLoggedIn, allUsersData, setUsersData}) {

  useEffect(() => {
    fetch("https://chat-app-data.onrender.com/users", {
      method: "GET",
      headers: {
          "Content-Type" : "application/json",
      },
  })
      .then((r) => r.json())
      .then((users) => {
        setUsersData(users);
      })
      .catch((error) => console.log(error))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsersData])
  if(!allUsersData) return "Loading..."

  if(!isLoggedIn) return <Redirect to="/login" />

  const usersToDisplay = allUsersData.map((user) => 
      <User 
        key={user.id}
        name={user.username}
        avatar={user.avatarURL}
   />
  )
    return (
        <div className="usersBox">
          {allUsersData ? usersToDisplay : "No users"}
        </div>
    );
  }

export default Users