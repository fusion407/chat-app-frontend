import { Redirect } from 'react-router-dom'
import User from "./User"

function Users({isLoggedIn, allUsersData}) {


  if(!isLoggedIn) return <Redirect to="/login" />
  const allUsersArray = allUsersData;
  const usersToDisplay = allUsersArray.map((user) => 
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