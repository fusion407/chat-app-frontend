import { useState } from 'react'
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';


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
        body: JSON.stringify(formData)
    })
        .then((r) => r.json())
        .then((newUser) => {
          setLoggedInUser(newUser);
          setUsersData((users) => [...users, newUser])
        })
        .catch((error) => console.log(error))
    }


    function handleUpdateUser(updatedUser) {
      const updateUser = allUsersData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user     
      );
      setUsersData(updateUser)
      setLoggedInUser(updatedUser)
    }
    
    
    function updateUserProfile(id) {
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
        .then((updatedUser) => handleUpdateUser(updatedUser))
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
        history.push("/chat")
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
        setLoggedInUser(foundUser);
        alert(`Welcome, ${foundUser.username}! You may now chat.`)
        history.push("/chat");
        return;
      }
    }


    function onUpdateClick(e) {
      e.preventDefault();
      const foundUser = allUsersData.find((user) => user.username === formData.username)
      if(!foundUser) {
        alert("Please input the username with new image URL")
        return;
      }
      else {
        updateUserProfile(foundUser.id)
        alert("Updated profile picture")
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
        <h1 className="loginTitle">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='loginForm'>
            <Input 
                type="text" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                placeholder="Username" 
            />

          </div>
          <div className='loginForm'>
            <Input 
              type="text" 
              name="avatarURL" 
              value={formData.avatarURL}
              onChange={handleChange}
              placeholder="Avatar URL" 
            />
          </div>
          {isLoggedIn ?
          <Button 
            color="success" 
            onClick={onUpdateClick} 
            variant="contained"
            >
              Update Profile Picture
          </Button>
          :
          <Button 
            type="submit" 
            variant="contained"
            >
              Login
          </Button>

          }
        </form>
        {isLoggedIn ? 
        <Button 
          color="error" 
          onClick={handleLogout} 
          variant="outlined"
          sx={{
            marginTop: "1em"
          }}
          >
            Logout
        </Button>
        :
        <Button 
          onClick={handleCreateAccount} 
          variant="outlined"
          sx={{
            marginTop: "1em"
          }}
          >
            Create Account
        </Button>
        }
        </div>
    );
  }


  
export default Login