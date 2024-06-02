const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const orders = require ('./routes/orders')
const products = require ('./routes/products')
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

mongoose
  .connect(process.env.MONGODB_ATLAS_URI || "mongodb+srv://tshepho:davidrap@cluster0.dwyuahg.mongodb.net/Productdb")
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use('/orders', orders)
app.use('/products', products)
app.use('/user', userRoute);

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('app is on Port ' + port)
})

