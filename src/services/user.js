const Role = require('../models/roles');
const InvariantError = require('../exceptions/InvariantError')

const addRole = async (name) => {
  const newRole = new Role(name);

  const savedRole = await newRole.save();

  if (!savedRole) {
    throw new InvariantError('Roles fail to be saved');
  }
  return savedRole;
}

module.exports = { addRole };