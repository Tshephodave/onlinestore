const express = require('express');
const {placeOrder}= require('../controller/orderController');
const router = new express.Router();
router.post("/placeOrder", placeOrder);
module.exports= router