import React from 'react'
import { Redirect } from 'react-router-dom'

function Users({isLoggedIn}) {
    if(!isLoggedIn) return <Redirect to="/login" />

    return (
      <div>
        <h1>This is my users component!</h1>
      </div>
    );
  }

export default Users