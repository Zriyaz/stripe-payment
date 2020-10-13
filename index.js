const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(
  'sk_test_51HSItfBwPhqkezFEIJsWET5P2yUNFJkx1rJz0x6KiLyG8JBZnLrJUDmjVVFyBDkxqyZRcornweDvmAwwOpns2gCQ00J5NwOtnv'
);
const { v4: uuidv4 } = require('uuid');
const connectDB = require("./db/db")
const Payment = require("./paymentModel")
const dotenv = require('dotenv')
const app = express();


//database 
connectDB()
// middleware
app.use(express.json());
app.use(cors());


// routes
app.get('/', (req, res) => {
  res.send('Payment Gaytway');
});

app.post('/payment',async(req, res) => {
  const {token: {email, id} } = req.body;

  const idempotencyKey = uuidv4();
  const charge = await stripe.charges.create({
    amount: 100,
    currency: 'inr',
    source: id,
    receipt_email: email,
    description: "Testing purpose",
  });

  const {status, amount} = charge
  
  try {
    if(status === 'succeeded'){
      const payment = new Payment({
        id : id,
        status : status,
        email_address : email,
        amount: amount
      })
      const paymentDone = await payment.save()
      res.status(201).json(paymentDone)
    }
  } catch (err) {
     res.status(500).json({msg: "server Error"}) 
     console.error(err)
  }
});

//listen parts 
const PORT  = process.env.PORT || 8020
 
app.listen(PORT, () => console.log(`Serving is running on ${PORT}...`));
