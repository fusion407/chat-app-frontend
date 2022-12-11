import React, { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Users from './components/Users'
import Chat from './components/Chat'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsersData, setUsersData] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({})
  if(isLoggedIn) {
    console.log(loggedInUser)
    console.log(allUsersData)
  }
  return (
    <div className="App-header">
      <NavBar />
      <Switch>
        <Route exact path="/chat">
          <Chat isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}/>
        </Route>
        <Route exact path="/users">
          <Users isLoggedIn={isLoggedIn} userData={allUsersData}/>
        </Route>
        <Route exact path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} setUsersData={setUsersData}/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
