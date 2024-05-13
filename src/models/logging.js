const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  itemdetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productList'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const LogPayment = mongoose.model('logPayment', logSchema);

module.exports = LogPayment;