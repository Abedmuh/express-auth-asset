// productModel.js
const mongoose = require('mongoose');

const productListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }
});

const ProductList = mongoose.model('productList', productListSchema);

module.exports = ProductList;
