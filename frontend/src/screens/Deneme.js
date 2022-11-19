import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
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

function Deneme() {
    const history = useNavigate()

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    const [sdkReady, setSdkReady] = useState(false)

    

    
    
    
    const handleInputFocus = ({ target }) => {
        setFocus(target.name);
      };
    
   
    //sandbox-1cCAhFHJHFKVxDtofQWLfFYwTxNzPLCa
    //sandbox-c3FEfibWvnZZC63fDW7uXSKFplNdRFzM
    //https://sandbox-api.iyzipay.com
    const dispatch = useDispatch()
    
    const addIyzicoScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://static.iyzipay.com/plugins/v1/iyzico-buttons.min.js";
      script.async = true;
      document.body.appendChild(script);
      // eslint-disable-next-line no-undef
      new iyzico.buttons();
  };
  addIyzicoScript();

   
    useEffect(() => {
        
        setSdkReady(true)
        
        
    }, [])
    
    

    

    
    return  (
     
   
    
        
    <div>

    
<div id="iyzico-button">
    <div class="iyzico-button-container">
        <form action="#" name="iyzico-form" method="POST" class="iyzico-form">
            <button type="submit" class="iyzico-button"><svg>...</svg></button>
        </form>
    </div>
</div>



        


           

    </div>

  ) 
}   

export default Deneme
