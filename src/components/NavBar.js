import React from "react"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
const linkStyles = {
    display: "inline-flex",
    aligncontent: "center",
    justifycontent: "center",
    width: "100px",
    padding: "12px",
    margin: "6px 6px 6px",
    background: "#A96762",
    textDecoration: "none",
    color: "black",
  };
function NavBar() {
    return (
      <div>
        <NavLink
          to="/"
          /* set exact so it knows to only set activeStyle when route is deeply equal to link */
          exact
          /* add styling to Navlink */
          style={linkStyles}
          /* add prop for activeStyle */
          activeStyle={{
            background: "grey",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/chat"
          exact
          style={linkStyles}
          activeStyle={{
            background: "grey",
          }}
        >
          Chat
        </NavLink>
        <NavLink
          to="/users"
          exact
          style={linkStyles}
          activeStyle={{
            background: "grey",
          }}
        >
          Users
        </NavLink>
        <NavLink
          to="/login"
          exact
          style={linkStyles}
          activeStyle={{
            background: "grey",
          }}
        >
          Login
        </NavLink>
      </div>
    );
  }

export default NavBar