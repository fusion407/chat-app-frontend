import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Login({setIsLoggedIn, setLoggedInUser, setUsersData}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        avatarURL: '',

    });

    // Checks to see if user exists
    function checkLoginData(users) {
      let foundUser = false;
      let correctPassword = false;
      users.forEach((user) => {
        // First find matching username
        if(formData.username === user.username ) {
          foundUser = true;
          console.log('found a matching username')
          // Then check to see if password is correct
          if(formData.password === user.password) {
            console.log('validation succesful!')
            correctPassword = true;
            setLoggedInUser(user)
            setIsLoggedIn(true)
            alert(`Welcome, ${user.username}! You may now chat.`)
          } else {
            console.log('but password is invalid')
            setIsLoggedIn(false)
            alert("Wrong password!")
            return;
          }
        }  
      })
      // If username and password is correct, log this user in
      if(foundUser && correctPassword) {
          console.log("logged in user: ")
          setUsersData(users);
      // If no user has been found by the inputted name, create a new user
      } else if(!foundUser) {
          setIsLoggedIn(false)
          alert("It looks like you dont have an account, so I'll make one for you")
          submitLoginData(formData)
          alert(`You're username is ${formData.username}.`)
      }
    }

    // Retrieves all user login data
    function fetchLoginData() {
      fetch("https://chat-app-data.onrender.com/users", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
        },
    })
        .then((r) => r.json())
        .then((users) => checkLoginData(users))
        .catch((error) => console.log(error))
    }    
    // Add the submitted data onto the server
    function submitLoginData(data) {
      console.log(data);
      fetch("https://chat-app-data.onrender.com/users", {
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
    // Event listener which keeps track of each time form has been changed
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    // Event listener which handles form submission
    // Fetches user login data and checks submitted credentials
    // A matching username but wrong password will alert user of wrong password
    // A new username is automatically submitted as new account
    function handleSubmit(e) {
        e.preventDefault();
        fetchLoginData(formData);
        history.push("/");
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
                // user={FormData.username}
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
            <p>Profile Picture: (if new user)</p>
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