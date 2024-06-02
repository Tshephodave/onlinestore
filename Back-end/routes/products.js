const express = require('express');
const router = new express.Router();
const {getProducts,
    addProduct} = require('../controller/productController');
router.post('/addProduct',addProduct);
router.get('/getProducts',getProducts);
module.exports= router;
