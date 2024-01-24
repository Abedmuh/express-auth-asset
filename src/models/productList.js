// productModel.js
const mongoose = require('mongoose');

const productListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

const ProductList = mongoose.model('product', productListSchema);

module.exports = ProductList;
