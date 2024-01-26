const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
    required: true,
  },
  password: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
})

const User = mongoose.model('user', userSchema);

module.exports = User;