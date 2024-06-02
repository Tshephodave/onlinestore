const Product = require('../model/product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products from the database' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, picture, price, category } = req.body;
    const newProduct = new Product({ name, description, picture, price, category });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getProducts,
  addProduct
};
