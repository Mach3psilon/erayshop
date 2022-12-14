import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import 'react-credit-cards/es/styles-compiled.css'
import Cards from "react-credit-cards";

import SupportedCards from "../components/creditCard/Cards";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
  } from "../components/creditCard/utils";
import "react-credit-cards/es/styles-compiled.css";

function PlaceOrderScreen() {
    const history = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    if(!cart.paymentMethod) {
        history('/payment')
    }

    useEffect(() => {
        if (success) {
            history(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    } , [history, success])
        
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {String(cart.shippingAddress.address)},  {"  "}
                            {String(cart.shippingAddress.city)}, {"  "}
                            {cart.shippingAddress.postalCode ? String(cart.shippingAddress.postalCode): ""} {"  "}
                            {String(cart.shippingAddress.country)}
                            
                            
                        </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {String(cart.paymentMethod)}
                           
                            
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={3}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col  md={4}>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>


                    </ListGroup.Item>
                                ))}

                </ListGroup>
                        )}
                                    
                    </ListGroup.Item>
                </ListGroup>
            </Col>


            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                            

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button onClick={placeOrder} type='button' className='btn-block' disabled={cart.cartItems === 0}>    
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </Col>
          
        </Row>  

    </div>

  ) 
}   

export default PlaceOrderScreen
