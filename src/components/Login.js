import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Login({setIsLoggedIn, setLoggedInUser, setUsersData}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        avatar: '',
        username: '',
        password: '',
    });

    function checkLoginData(users) {
      let foundUser = false;
      let correctPassword = false;
      users.forEach((user) => {
        if(formData.username == user.username ) {
          foundUser = true;
          console.log('found a matching username')
          if(formData.password == user.password) {
            console.log('validation succesful!')
            correctPassword = true;
            setIsLoggedIn(true)
            alert(`Welcome, ${user.username}! You may now chat.`)
            return;
          } else {
            console.log('but password is invalid')
            setIsLoggedIn(false)
            alert("Wrong password!")
            return;
          }
        }  
      })
      if(foundUser && correctPassword) {
        console.log("logged in user: ")
        setLoggedInUser(formData);
        setUsersData(users);
      } else if(!foundUser) {
        setIsLoggedIn(false)
        alert("It looks like you dont have an account, so I'll make one for you")
        submitLoginData(formData)
        alert(`You're username is ${formData.username}. You may now login.`)
      }
    }

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
      })
    })
        .then((r) => r.json())
        .then((users) => console.log(users))
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
                user={FormData.username}
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
          <button type="submit">Login</button>
        </form>
        {/* <Button variant="dark">Create new account</Button>       */}
        </div>
    );
  }

export default Login