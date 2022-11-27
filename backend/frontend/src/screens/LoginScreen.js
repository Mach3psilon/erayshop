import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'

function LoginScreen() {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const { search } = useLocation();
     

    const redirect = search ? search.split('=')[1] : '/'

    const history = useNavigate()
    useEffect(() => {
        if(userInfo) {
            history(redirect)
        }
    }, [userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <div>
        <FormContainer><h2>Sign In</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>Sign In</Button>

                </Form>       
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                    </Col>
                </Row>

        
        </FormContainer>
    </div>
  )
}

export default LoginScreen
