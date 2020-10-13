const mongoose =  require('mongoose');
const dotenv = require('dotenv')

const url = 'mongodb+srv://payment:payment123@pay.yy6d3.mongodb.net/<dbname>?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB
