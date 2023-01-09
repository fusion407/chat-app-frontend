import React from "react"
import { NavLink } from "react-router-dom";


const linkStyles = {
    display: "inline-flex",
    flexdirection: "row",
    aligncontent: "center",
    justifycontent: "center",
    width: "5em",
    borderStyle: "solid",
    borderColor: "#38302E",
    padding: "1em",
    margin: "2em 6px 6px",
    background: "#a8b3d1",
    textDecoration: "none",
    color: "black",
  };


function NavBar(props) {

    return (

      <div>

        <NavLink
          to="/"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#858da5",
          }}
        >
          Home
        </NavLink>


        <NavLink
          to="/chat"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#858da5",
          }}
        >
          Forum
        </NavLink>


        <NavLink
          to="/users"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#858da5",
          }}
        >
          Users
        </NavLink>


        <NavLink
          to="/login"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#858da5",
          }}
        >
          Login
        </NavLink>

        <h3>
          {!props.isLoggedIn ? 'Logged out' : 'Logged in as: ' + props.loggedInUser.username}
        </h3>

      </div>
    );
  }


export default NavBar