// productModel.js
const mongoose = require('mongoose');

const productListSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  }
});

const ProductList = mongoose.model('product', productListSchema);

module.exports = ProductList;
