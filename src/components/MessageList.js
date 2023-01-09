import Message from "./Message"

function MessageList(props) {

    const messageArray = props.messages;
    const messagesToDisplay = messageArray.map((message) => 
    <Message 
        id={message.id}
        key={message.id}
        name={message.name}
        comment={message.comment}
        avatarURL={message.avatarURL}
        deleteComment={props.deleteComment}
    />
)

    return(
        <>
            {messagesToDisplay}
        </>
    )
}


export default MessageList