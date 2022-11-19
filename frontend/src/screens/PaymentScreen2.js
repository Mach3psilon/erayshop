import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'


import 'react-credit-cards/es/styles-compiled.css'
import Card from "react-credit-cards";

import SupportedCards from "../components/creditCard/Cards";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
  } from "../components/creditCard/utils";
import "react-credit-cards/es/styles-compiled.css";


function PaymentScreen() {

    const history = useNavigate()

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')

   
    const handleInputFocus = ({ target }) => {
        setFocus(target.name);
      };
   
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>
            
            <br></br>
            <Button type='submit' variant='primary'>
                Continue
            </Button>

        </Form>

    </FormContainer>
  )
}

export default PaymentScreen
