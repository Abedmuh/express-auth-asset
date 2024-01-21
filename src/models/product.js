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
    type: Boolean
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
