import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Login({isLoggedIn, setIsLoggedIn, setLoggedInUser, setUsersData}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        avatarURL: '',
    });

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
        .then((users) => {
          setLoggedInUser(users);
        })
        .catch((error) => console.log(error))
    }

    function checkLoginData(users) {
      let foundUser = false;
      let correctPassword = false;
      if(formData.username === '' || formData.password === '') {
        alert("Please enter both username and password");
        return;
      }
      users.forEach((user) => {
        if(formData.username === user.username) {
          foundUser = true;
          if(formData.password === user.password) {
            console.log('validation succesful!')
            correctPassword = true;
            if(formData.avatarURL !== user.avatarURL && formData.avatarURL !== '') {
              updateUserProfile(formData, user.id)
            }
            setLoggedInUser(user)
            alert(`Welcome, ${user.username}! You may now chat.`)
            history.push("/")
          } else {
            setIsLoggedIn(false)
            alert("Wrong password!")
            return;
          }
        }  
      })
      if(foundUser && correctPassword) {
          setUsersData(users);
          setIsLoggedIn(true)
      } else if(!foundUser && !correctPassword) {
          setIsLoggedIn(false)
          alert("It looks like you dont have an account, so I'll make one for you")
          submitLoginData(formData)
          alert(`You're username is ${formData.username}. You may now log in.`)
          history.push('/')
      }
    }

    async function fetchLoginData() {
      await fetch("https://chat-app-data.onrender.com/users", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
        },
    })
        .then((r) => r.json())
        .then((users) => {
          if(!isLoggedIn) checkLoginData(users);
        })
        .catch((error) => console.log(error))
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
        .then((user) => {
          setLoggedInUser(user)
          setIsLoggedIn(true);
          fetchLoginData();
        })
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
        fetchLoginData(formData);
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
        </div>
    );
  }

export default Login