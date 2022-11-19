import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

import FormContainer from '../components/FormContainer'


function ShippingScreen() {
    const history = useNavigate()   
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")

    useEffect(() => {
    if (shippingAddress === null ) {
        console.log("hey")
        
    }
    else {

    setAddress(shippingAddress.address)
    setCity(shippingAddress.city)
    setPostalCode(shippingAddress.postalCode)
    setCountry(shippingAddress.country)
    }} , [shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history('/payment')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control  
                required 
                type='text' 
                placeholder='Enter Address' 
                value={address ? address : ''}
                onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control  
                required 
                type='text' 
                placeholder='Enter City' 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control   
                type='text' 
                placeholder='Enter Postal Code' 
                value={postalCode} 
                onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control   
                type='text' 
                placeholder='Enter Country' 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
                <br></br>
            <Button type='submit' variant='primary'>
                Continue
            </Button>



        




      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
