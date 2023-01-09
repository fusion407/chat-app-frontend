import React from "react"
import { NavLink } from "react-router-dom";


const linkStyles = {
    display: "inline-flex",
    flexdirection: "row",
    aligncontent: "center",
    justifycontent: "center",
    width: "100px",
    padding: "1em",
    margin: "2em 6px 6px",
    background: "#9CAEA9",
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
            background: "#788585",
          }}
        >
          Home
        </NavLink>


        <NavLink
          to="/chat"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#788585",
          }}
        >
          Forum
        </NavLink>


        <NavLink
          to="/users"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#788585",
          }}
        >
          Users
        </NavLink>


        <NavLink
          to="/login"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#788585",
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