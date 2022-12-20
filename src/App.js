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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsersData, setUsersData] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({})
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/chat">
          <Chat 
            isLoggedIn={isLoggedIn} 
            userData={allUsersData} 
            loggedInUser={loggedInUser}
            messages={messages}
            setMessages={setMessages}
          />
        </Route>

        <Route exact path="/users">
          <Users 
            isLoggedIn={isLoggedIn} 
            userData={allUsersData}
          />
        </Route>

        <Route exact path="/login">
          <Login 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            setLoggedInUser={setLoggedInUser} 
            setUsersData={setUsersData}
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
