import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './App.css';

function App() {
  const [product, setProduct] = useState({
    name: 'Donate 10 Doller',
    price: 10,
    productBy: 'Test',
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`http://localhost:8020/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log('RESPONSE: ', response);
        const { status } = response;
        console.log('STATUS', status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='App'>
      <StripeCheckout
        stripeKey='pk_test_51HSItfBwPhqkezFE7lrjVrLZG0Vvp8E5EBArHLtruyo1R5meBQBuMrqSQUMgDi8SG9HTwVwcDhn7irp8Z1DM35iw00lRnCtHb7'
        token={makePayment}
        name='By React'
        amount={product.price * 100}>
        <button>Donate 100 Rupees</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
