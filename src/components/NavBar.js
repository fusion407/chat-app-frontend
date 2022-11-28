import React from "react"
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
function NavBar() {
    return(
        <div>  
            <Stack direction="horizontal" gap={2}>
            <h2>Chat-App</h2>  
            <Button as="a" variant="dark">
              Home
            </Button>
            <Button as="a" variant="dark">
              Join Chat
            </Button>
            <Button as="a" variant="dark">
              New Chat
            </Button>
            <Button as="a" variant="dark">
              Users
            </Button>
            <Button as="a" variant="dark">
              Login
            </Button>
            </Stack>        
        </div>
    )
}

export default NavBar