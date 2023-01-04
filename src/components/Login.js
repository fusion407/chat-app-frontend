import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

function Login({onHandleUpdateUser, isLoggedIn, setIsLoggedIn, setLoggedInUser, allUsersData, setUsersData, fetchUserData}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        avatarURL: '',
    });
    useEffect(() => {
      console.log("updating user data...")
  }, [])
  if(!allUsersData) return "Loading..."


  async function submitLoginData(data) {
      console.log(data);
      await fetch("https://chat-app-data.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          key : data.id,
          username : data.username,
          avatarURL : data.avatarURL,
      })
    })
        .then((r) => r.json())
        .then((user) => {
          setLoggedInUser(user);
          setUsersData((user) => [...allUsersData, user])
        })
        .catch((error) => console.log(error))
    }
    function handleCreateAccount() {
      let foundUser = false;
      allUsersData.forEach((user) => {
        if(formData.username === user.username) {
          alert("Account already exists")
          foundUser = true;
        }
      })
      if(foundUser) {
        return;
      } else {
        submitLoginData(formData)
        alert("Created new user.")
        history.push("/")
      }
    }
    function checkLoginData() {
      fetchUserData();
      if(formData.username === '') {
        alert("Please enter a username");
        return;
      }
      allUsersData.forEach((user) => {
        if(formData.username === user.username) {
          if(!user.username) {
            alert("Account not found")
            return;
          } else {
            if(formData.avatarURL !== user.avatarURL && formData.avatarURL !== '') {
              updateUserProfile(formData, user.id)
              alert("Updated user profile picture, please log in again.")
              setIsLoggedIn(false)
              setLoggedInUser('')
              history.push("/")
              return;
            }
          }
          setLoggedInUser(user)
          setIsLoggedIn(true)
          alert(`Welcome, ${user.username}! You may now chat.`)
          history.push("/")
          return;
        }  
      })
    }


    function updateUserProfile(data, id) {
      fetch(`https://chat-app-data.onrender.com/users/${id}`, {
        method: "PATCH",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          avatarURL : data.avatarURL,
      })
    })
        .then((r) => r.json())
        .then(() => onHandleUpdateUser)
        .catch((error) => console.log(error))
    }

    function handleChange(e) {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    function handleChangeAvatar(e) {
      e.preventDefault();
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setUsersData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        checkLoginData(e);
    }
    function handleLogout(e) {
      e.preventDefault();
      setLoggedInUser("")
      setIsLoggedIn(false);
      history.push("/")
    }
    
    return (
      <div className="loginScreen">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
                type="text" 
                name="username" 
                value={FormData.username}
                onChange={handleChange}
                placeholder="Username" 
            />
          </div>
          <div>
            <p>Profile Picture:</p>
            <input 
                type="text" 
                name="avatarURL" 
                value={FormData.avatarURL}
                onChange={handleChangeAvatar}
                placeholder="URL" 
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {isLoggedIn ? 
        <button onClick={handleLogout}>Logout</button>
        :
        <button onClick={handleCreateAccount}>Create Account</button>
        }
        </div>
    );
  }

export default Login