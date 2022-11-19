import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'





function PaymentScreen() {

    const history = useNavigate()

   
    

   
    
   
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    
    const [paymentMethod, setPaymentMethod] = useState('Credit Card')

    if(!shippingAddress.address) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(paymentMethod)
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
                    label='Credit Card'
                    id='Credit Card'
                    name='paymentMethod'
                    value='Credit Card'
                    checked
                    onClick={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                    type='radio'
                    label='PayPal'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    
                    onClick={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>
            
            <br></br>
            <Button type='submit' variant='primary'>
                Order
            </Button>
            
            

        </Form>
        
    </FormContainer>
    
  )
}

export default PaymentScreen
