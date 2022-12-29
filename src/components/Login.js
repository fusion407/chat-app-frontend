import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

function Login({isLoggedIn, setIsLoggedIn, setLoggedInUser, allUsersData, setUsersData}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        avatarURL: '',
    });

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
    }, [])

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
          password : data.password,
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

    function checkLoginData() {
      let foundUser = false;
      let correctPassword = false;
      if(formData.username === '' || formData.password === '') {
        alert("Please enter both username and password");
        return;
      }
      allUsersData.forEach((user) => {
        if(formData.username === user.username) {
          foundUser = true;
          if(formData.password === user.password) {
            console.log('validation succesful!')
            correctPassword = true;
            if(formData.avatarURL !== user.avatarURL && formData.avatarURL !== '') {
              updateUserProfile(formData, user.id)
            }
            setLoggedInUser(user)
            setIsLoggedIn(true)
            alert(`Welcome, ${user.username}! You may now chat.`)
            history.push("/")
          } else {
            setIsLoggedIn(false)
            alert("Wrong password!")
            return;
          }
        }  
      })
      if(!foundUser && !correctPassword) {
          setLoggedInUser("")
          setIsLoggedIn(false)
          alert("It looks like you dont have an account, so I'll make one for you")
          submitLoginData(formData)
          alert(`You're username is ${formData.username}. You may now log in.`)
          history.push('/')
      }
    }

    function handleUpdateUser(updatedUser) {
      const updateUser = allUsersData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsersData(updateUser)
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
        .then(handleUpdateUser)
        .catch((error) => console.log(error))
    }

    function handleChange(e) {
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
                value={FormData.username}
                onChange={handleChange}
                placeholder="Username" 
            />
          </div>
          <div>
            <input 
                type="password" 
                name="password" 
                value={FormData.password}
                onChange={handleChange}
                placeholder="Password" 
            />
          </div>
          <div>
            <p>Profile Picture:</p>
            <input 
                type="text" 
                name="avatarURL" 
                value={FormData.avatarURL}
                onChange={handleChange}
                placeholder="URL" 
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
  }

export default Login