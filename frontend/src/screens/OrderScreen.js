import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import 'react-credit-cards/es/styles-compiled.css'
import Cards from "react-credit-cards";
import FormContainer from '../components/FormContainer'
import {ORDER_PAY_RESET ,ORDER_DELIVER_RESET } from '../constants/orderConstants'

import SupportedCards from "../components/creditCard/Cards";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
  } from "../components/creditCard/utils";
import "react-credit-cards/es/styles-compiled.css";

function OrderScreen() {
    const history = useNavigate()

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
 

    const orderId = useParams().id

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleInputFocus = ({ target }) => {
        setFocus(target.name);
      };
    
    if(!loading && !error) {

    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

 
    const dispatch = useDispatch()

    const successPaymentHandler = (e) => {
        
        e.preventDefault();
        //window.location.reload();
        dispatch(
            payOrder({
                orderId: orderId,
                cardNumber: cardNumber,
                cardName: cardName,
                expiry: expiry,
                cvc: cvc,
                itemsPrice: order.totalPrice,
            })
        )
        
    }   



    useEffect(() => {
        if(!userInfo) {
            history('/login')
        }
        if(!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            
            dispatch(getOrderDetails(orderId))

            

        }
        
    } , [dispatch, order, orderId, successPay, successDeliver, history, userInfo])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return loading ? (
    <Loader />) : 
    error ? (
    <Message variant='danger'>{error}</Message>  
    ) : (
        
    <div>

    
   



        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                        <p>
                            <strong>Address: </strong>
                            {String(order.shippingAddress.address)},  {"  "}
                            {String(order.shippingAddress.city)}, {"  "}
                            {order.shippingAddress.postalCode ? String(order.shippingAddress.postalCode): ""} {"  "}
                            {String(order.shippingAddress.country)}
                            
                            
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt.substring(0,10)}</Message>
                        ) : (
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message>
                            ) : ( <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {String(order.paymentMethod)}
                            </p>
                            <br></br><br></br>
                            
                            <Form.Group>
            <Col>
            <br></br>
            <Cards
            number={cardNumber}
            name={cardName}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
            
          />
          <br></br>
          </Col>
          
            </Form.Group>

            <Form onSubmit={successPaymentHandler} >
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                name="number" 
                onFocus={handleInputFocus} 
                required 
                type='name' 
                placeholder='Enter name' 
                value={cardName} 
                onChange={(e) => 
                setCardName(e.target.value.toUpperCase())}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='cardNumber'>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                name="number"
                onFocus={handleInputFocus}
                required
                type='tel'
                placeholder='Enter card number'
                pattern='[\d| ]{16,22}'
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCreditCardNumber(e.target.value))}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='expiry'>
                    
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                name="expiry"
                onFocus={handleInputFocus}
                required
                type='tel'
                placeholder='Enter expiry date'
                pattern='\d\d/\d\d'
                value={expiry}
                onChange={(e) => setExpiry(formatExpirationDate(e.target.value))}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='cvc'>
                    
                <Form.Label>CVC</Form.Label>    
                <Form.Control
                name="cvc"
                onFocus={handleInputFocus}
                required
                type='tel'
                placeholder='Enter CVC'
                pattern='\d{3,4}'
                value={cvc}
                onChange={(e) => setCvc(formatCVC(e.target.value))}
                ></Form.Control>
                <br></br>
            </Form.Group>
            <Form.Group>
                <Button type='submit' variant='primary'>
                    Pay
                </Button>

                
            </Form.Group>
            
            
            </Form>
            <br></br>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                           
                            
                        

                    </ListGroup.Item>)}
                    
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>Order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                    
                        
                    </ListGroup>
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )  }
                </Card>
            </Col>
          
        </Row>  

    </div>

  ) 
}   

export default OrderScreen
