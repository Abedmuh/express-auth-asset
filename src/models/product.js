// productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
