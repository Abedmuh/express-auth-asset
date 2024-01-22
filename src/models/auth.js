const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
})

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;