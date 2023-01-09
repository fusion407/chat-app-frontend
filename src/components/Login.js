import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Login({isLoggedIn, setIsLoggedIn, setLoggedInUser, allUsersData, setUsersData}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        avatarURL: '',
    });


  async function submitLoginData() {
      await fetch("https://chat-app-data.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          key : formData.id,
          username : formData.username,
          avatarURL : formData.avatarURL,
      })
    })
        .then((r) => r.json())
        .then((user) => {
          setLoggedInUser(user);
          setUsersData((user) => [...allUsersData, user])
        })
        .catch((error) => console.log(error))
    }

    function handleUpdateUser(updatedUser) {
      const updateUser = allUsersData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user     
      );
      console.log(updateUser)
      setLoggedInUser(updateUser)
      setUsersData(updateUser)
    }
      function updateUserProfile(id) {
        console.log(id)
  
        if(!id) {
          alert("Account does not exist.")
          return;
        }
        fetch(`https://chat-app-data.onrender.com/users/${id}`, {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            avatarURL : formData.avatarURL,
        })
      })
          .then((r) => r.json())
          .then(() => handleUpdateUser)
          .catch((error) => console.log(error))
      }
  
    function handleCreateAccount() {
      if(formData.username === '') {
        alert("Please enter a username");
        return;
      }
      const foundUser = allUsersData.find((user) => user.username === formData.username)
      if(foundUser) {
        alert("User already exists.")
        return;
      } else {
        submitLoginData(formData)
        setIsLoggedIn(true)
        alert("Created new user. Welcome!")
        history.push("/")
      }
    }


    function checkLoginData() {
      if(formData.username === '') {
        alert("Please enter a username");
        return;
      }
      const foundUser = allUsersData.find((user) => user.username === formData.username)
      if(!foundUser) {
        alert("Account does not exist")
        return;
      } else {
        setIsLoggedIn(true)
        setLoggedInUser(foundUser)
        alert(`Welcome, ${foundUser.username}! You may now chat.`)
        history.push("/")
        return;
      }
    }


    function onUpdateClick(e) {
      e.preventDefault();
      const foundUser = allUsersData.find((user) => user.username === formData.username)
      if(!foundUser) return;
      else {
        updateUserProfile(foundUser.id)
        setLoggedInUser('')
        setIsLoggedIn(false)
        alert("Updated profile picture, please log back in")
        history.push("/")
      }
    }
    

    function handleChange(e) {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
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
          <div className='loginForm'>
            <input 
                type="text" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                placeholder="Username" 
            />
          </div>
          <div className='loginForm'>
            <input 
                type="text" 
                name="avatarURL" 
                value={formData.avatarURL}
                onChange={handleChange}
                placeholder="Avatar URL" 
            />
          </div>
          {isLoggedIn ?
          <button onClick={onUpdateClick}>Update Profile Picture</button>
          :
          <button type="submit">Login</button>

          }
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