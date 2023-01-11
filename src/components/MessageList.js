import Message from "./Message"

function MessageList({messages, deleteComment}) {

    const messagesToDisplay = messages.map((message) => 
    <Message 
        key={message.id}
        message={message}
        deleteComment={deleteComment}
    />
)

    return(
        <>
            {messagesToDisplay}
        </>
    )
}


export default MessageList