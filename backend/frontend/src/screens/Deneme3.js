import React, {useState, useEffect} from 'react'



function Deneme3() {
    const addIyzipayScript  =    () => {
        const script = document.createElement("script");
        script.src = "https://static.iyzipay.com/plugins/v1/iyzico-buttons.min.js";
        script.async = true;
        document.body.appendChild(script);
    };
    
    
    useEffect(() => {
        addIyzipayScript();
    }, []);

    

   
    

    
    
  return (
    <div id="iyzico-button">
    <div class="iyzico-button-container">
        <form action="#" name="iyzico-form" method="POST" class="iyzico-form">
            <button type="submit" class="iyzico-button"><svg>...</svg></button>
        </form>
    </div>
</div>
  )
}

export default Deneme3
