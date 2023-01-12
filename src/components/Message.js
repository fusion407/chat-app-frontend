import defaultProfile from '../defaultProfile.png'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from '@mui/material/Avatar';


function Message ({message, deleteComment}) {
    
    const {id, name, comment, avatarURL} = message

    return(
        <div className="chatBox" value={name}>
            <div>
                {/* <img 
                    className="avatarImage" 
                    src={avatarURL ? avatarURL : defaultProfile} 
                    alt="avatarImage">
                 </img> */}
                <Avatar 
                    // alt="avatarImage" 
                    src={avatarURL ? avatarURL : defaultProfile} 
                    className="avatarImage"
                    sx={{
                        width: 56,
                        height: 56,
                        marginRight: '0.5em'
                    }}
                />
            </div>
            <div>
                <ListGroup.Item style={{background: "rgba(168, 179, 209, 0.4)"}}>{name ? name : "Anonymous"}:</ListGroup.Item>
                <ListGroup.Item>{comment}</ListGroup.Item>
            </div>
            <div>
                <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteComment(id)}
                    sx={{
                        marginLeft: "1em",
                        marginTop: "1em"
                    }}
                >
                    Delete
                </Button>
            </div>


        </div>
    )
}


export default Message