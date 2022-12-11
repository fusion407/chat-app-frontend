import React from "react"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
const linkStyles = {
    display: "inline-flex",
    flexdirection: "row",
    aligncontent: "center",
    justifycontent: "center",
    width: "100px",
    padding: "12px",
    margin: "6px 6px 6px",
    background: "#73a24e",
    textDecoration: "none",
    color: "black",
  };
function NavBar() {
    return (
      <div>
        <NavLink
          to="/"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#a9c25d",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/chat"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#a9c25d",
          }}
        >
          Chat
        </NavLink>
        <NavLink
          to="/users"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#a9c25d",
          }}
        >
          Users
        </NavLink>
        <NavLink
          to="/login"
          exact
          style={linkStyles}
          activeStyle={{
            background: "#a9c25d",
          }}
        >
          Login
        </NavLink>
      </div>
    );
  }

export default NavBar