import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Users from './components/Users'
import Chat from './components/Chat'
import NavBar from './components/NavBar'
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsersData, setUsersData] = useState([])
  const [loggedInUser, setLoggedInUser] = useState({
    id : '',
    username : '',
    avatarURL : '',
  })
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("initializing data...")
    handleFetchUserData();
    handleFetchMessages();
  }, [])

  // update user
  function handleUpdateUser(updatedUser) {
    const updateUser = allUsersData.map((user) =>
      user.id === updatedUser.id ? updatedUser : user     
    );
    console.log(updateUser)
    setLoggedInUser(updateUser)
    return setUsersData(updateUser)
  }


  // fetch messages
  const handleFetchMessages = async () => {
    console.log("fetching message data...")
    await fetch("https://chat-app-data.onrender.com/messages", {
      method: "GET",
      headers: {
          "Content-Type" : "application/json",
      },
  })
      .then((r) => r.json())
      .then((message) => {
          setMessages(message)             
      })
      .catch((error) => console.log(error))
  }

  // fetch users
  const handleFetchUserData = async () => {
  console.log("fetching user data")
  await fetch("https://chat-app-data.onrender.com/users", {
      method: "GET",
      headers: {
          "Content-Type" : "application/json",
      },
  })
      .then((r) => r.json())
      .then((data) => {
          setUsersData(data)
          console.log(data)             
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}/>
      <Switch>
        <Route exact path="/chat">
          <Chat 
            isLoggedIn={isLoggedIn} 
            loggedInUser={loggedInUser}
            messages={messages}
            setMessages={setMessages}
            allUsersData={allUsersData}
            onUpdateMessage={handleFetchMessages}
          />
        </Route>

        <Route exact path="/users">
          <Users 
            isLoggedIn={isLoggedIn} 
            allUsersData={allUsersData}
            setUsersData={setUsersData}
            fetchUserData={handleFetchUserData} 
          />
        </Route>

        <Route exact path="/login">
          <Login 
            onHandleUpdateUser={handleUpdateUser} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} 
            setLoggedInUser={setLoggedInUser} 
            allUsersData={allUsersData}
            setUsersData={setUsersData}
            fetchUserData={handleFetchUserData}
          />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

      </Switch>
    </div>

  );
}

export default App;
