import React from 'react'
import {Alert} from 'react-bootstrap'


function Message(variant) {
    
  return (
    <Alert variant={variant.variant}>
      {variant.children}
    </Alert>
  )
}

export default Message
