const Role = require('../models/roles')
const User = require('../models/users')
const Auth = require('../models/auth')
const InvariantError = require('../exceptions/InvariantError')
const AuthenticationError = require('../exceptions/AuthenticationError')
const NotFoundError = require('../exceptions/NotFoundError')


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

const deleteTokenUser = async (token) => {

  const token = await Auth.findByIdAndDelete(token)
  if (!token) {
    throw new NotFoundError('Token not found');
  }
  return token
}

const addRole = async (name) => {
  const role = new Role(name);

  const savedRole = await role.save();

  if (!savedRole) {
    throw new InvariantError('Roles fail to be saved');
  }
  return savedRole;
}

const deleteRole = async (id) => {

  const role = await Role.findByIdAndDelete(id)
  if (!role) {
    throw new NotFoundError('Role not found');
  }

  return role;
}

module.exports = {
  addUser,
  verifyUser,
  deleteTokenUser,
  addRole,
  deleteRole
};