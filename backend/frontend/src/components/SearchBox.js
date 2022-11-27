import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'

 
 function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(location.pathname)
        }
    }

  

   return (
     <Form onSubmit={submitHandler} >
     <Row>
         <Col>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-3'
            ></Form.Control>
            </Col>
            <Col>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
            </Col>
        </Row>
     </Form>
   )
 }
 
 export default SearchBox
 