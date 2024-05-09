const User = require('../models/user')
const InvariantError = require('../exceptions/InvariantError')
const AuthenticationError = require('../exceptions/AuthenticationError')
const bcrypt = require('bcrypt')

const addUser = async ({ name, username, email, role, password }) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    username,
    email,
    role,
    password: hashedPassword,
  });

  const savedUser = await user.save();

  if (!savedUser) {
    throw new InvariantError('Users fail to be saved');
  }
  return savedUser;
}

const verifyUser = async ({ username, password }) => {

  const user = await User.findOne({ username })
  const pass = await bcrypt.compare(password, user.password)

  if (!user || !pass) {
    throw new AuthenticationError('Invalid username or password');
  }
  return user;
}

module.exports = {
  addUser,
  verifyUser,
};