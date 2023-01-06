import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

function Login({onHandleUpdateUser, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser, allUsersData, setUsersData}) {
    const history = useHistory();
    const [foundUserId, setFoundUserId] = useState();
    const [formData, setFormData] = useState({
        username: '',
        avatarURL: '',
    });

    useEffect(() => {
      console.log("updating user data...")
  }, [])
  if(!allUsersData) return "Loading..."


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
        alert("Created new user.")
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
        setLoggedInUser(foundUser)
        setIsLoggedIn(true)
        setFoundUserId(foundUser.key)
        alert(`Welcome, ${foundUser.username}! You may now chat.`)
        history.push("/")
        return;
      }
      
      // todo: create new button with event listener that handles change of users profile

      // {
      //   if(formData.username === user.username) {
      //     if(!user.username) {
      //       alert("Account not found")
      //       return;
      //     } else {
      //       if(formData.avatarURL !== user.avatarURL && formData.avatarURL !== '') {
      //         updateUserProfile(formData, user.id)
      //         alert("Updated user profile picture.")
      //         setIsLoggedIn(true)
      //         setLoggedInUser(user)
      //         history.push("/")
      //         return;
      //       }
      //     }
      //     setLoggedInUser(user)
      //     setIsLoggedIn(true)
      //     alert(`Welcome, ${user.username}! You may now chat.`)
      //     history.push("/")
      //     return;
      //   }  
      // })


    }


    function updateUserProfile(id) {
      console.log(foundUserId)

      if(!foundUserId) {
        alert("Please log in before updating profile")
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
          <div>
            <input 
                type="text" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                placeholder="Username" 
            />
          </div>
          <div>
            <p>Profile Picture:</p>
            <input 
                type="text" 
                name="avatarURL" 
                value={formData.avatarURL}
                onChange={handleChange}
                placeholder="URL" 
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={() => updateUserProfile(foundUserId)}>Update Profile Picture</button>
        {isLoggedIn ? 
        <button onClick={handleLogout}>Logout</button>
        :
        <button onClick={handleCreateAccount}>Create Account</button>
        }
        </div>
    );
  }

export default Login