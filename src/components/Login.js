import React from 'react'
import Button from 'react-bootstrap/Button';

function Login() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <input type="submit" value="Submit" />
        </form>
        <Button variant="dark">Create new account</Button>      
        </div>
    );
  }

export default Login