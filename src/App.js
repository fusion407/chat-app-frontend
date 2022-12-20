import React, { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Users from './components/Users'
import Chat from './components/Chat'
import NavBar from './components/NavBar'
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // is the user logged in or not?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // records for all users in the server
  const [allUsersData, setUsersData] = useState({})

  // keeps track of which user is logged in
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/chat">
          <Chat isLoggedIn={isLoggedIn} userData={allUsersData} loggedInUser={loggedInUser}/>
        </Route>

        <Route exact path="/users">
          <Users isLoggedIn={isLoggedIn} userData={allUsersData}/>
        </Route>

        <Route exact path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} setUsersData={setUsersData}/>
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

      </Switch>
    </div>

  );
}

export default App;
