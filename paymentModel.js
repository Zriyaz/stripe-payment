const mongoose =  require('mongoose')
const paymentSchema = mongoose.Schema({
    
        id: { type: String },
        status: { type: String },
        date: {
            type: Date,
            default: Date.now
          },
        email_address: { type: String },
    amount: {
        type: Number,
        required: true,
        default: 0.0,
      },
}) 


const Payment = mongoose.model("Payment", paymentSchema )
module.exports = Payment