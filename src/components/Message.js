import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Message ({name, comment}) {
    return(
        <div>
            <ListGroup.Item variant="secondary">{name}:</ListGroup.Item>
            <ListGroup.Item>{comment}</ListGroup.Item>
        </div>
    )
}

export default Message