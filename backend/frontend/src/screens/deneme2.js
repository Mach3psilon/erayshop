import React, {useState, useEffect} from 'react'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'


function Deneme() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    
   

  return (
    <div id="PaymentForm">
      <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={cardName}
          number={cardNumber} 
        /> 
        <br></br>
        <br></br>
        <form>
            <input 
            type="tel" 
            name="cardNumber" 
            placeholder="Card Number" 
            value={cardNumber} 
            onChange={(e) => 
            setCardNumber(e.target.value)} 
            onFocus={(e) => 
            setFocus(e.target.name)} />
            
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={(e) => (setCardNumber(e.target.value))}
            value={cardNumber}
            onFocus={(e) => (setFocus(e.target.name))}
            
          />
          <br></br>
            <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => (setCardName(e.target.value))}
            value={cardName}
            onFocus={(e) => (setFocus(e.target.name))}
            />
            <br></br>
            <input
            type="text"
            name="expiry"
            placeholder="MM/YY Expiry"
            onChange={(e) => (setExpiry(e.target.value))}
            value={expiry}
            onFocus={(e) => (setFocus(e.target.name))}
            />
            <br></br>
            <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={(e) => (setCvc(e.target.value))}
            value={cvc}
            onFocus={(e) => (setFocus(e.target.name))}
            />

                        
          
          
        </form>
    </div>
  )
}

export default Deneme
