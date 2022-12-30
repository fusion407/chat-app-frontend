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
  const [loggedInUser, setLoggedInUser] = useState({})
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("running useEffect...")
    handleFetchUserData();
    handleFetchMessages();
  }, [])

  function handleUpdateUser(updatedUser) {
    const updateUser = allUsersData.map((user) =>
      user.id === updatedUser.id ? updatedUser : user     
    );
    console.log(updateUser)
    return setUsersData(updateUser)
  }


  // fetch messages
  const handleFetchMessages = async () => {
    console.log("fetching message")
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
      <NavBar />
      <Switch>
        <Route exact path="/chat">
          <Chat 
            isLoggedIn={isLoggedIn} 
            loggedInUser={loggedInUser}
            messages={messages}
            setMessages={setMessages}
            onUpdateMessage={handleFetchMessages}
          />
        </Route>

        <Route exact path="/users">
          <Users 
            isLoggedIn={isLoggedIn} 
            allUsersData={allUsersData}
            fetchUserData={handleFetchUserData} 
          />
        </Route>

        <Route exact path="/login">
          <Login 
            onHandleUpdateUser={handleUpdateUser} 
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
