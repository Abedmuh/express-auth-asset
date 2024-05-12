const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
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
  payment: {
    type: String,
    required: true,
    default: "inProggres",
  }
})

const Logging = mongoose.model('log', logSchema);

module.exports = Logging;