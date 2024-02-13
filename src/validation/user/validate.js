const InvariantError = require("../../exceptions/InvariantError");
const { userValidateSchema,
  loginValidateSchema,
  roleValidateSchema } = require("./scheme");

const validationResultUser = (user) => {
  const validationResult = userValidateSchema.validate(user)
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message)
  }
};

const validationResultLogin = login => {
  const validationResult = loginValidateSchema.validate(login)
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message)
  }
}

const validationResultRole = role => {
  const validationResult = roleValidateSchema.validate(role)
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message)
  }
}

module.exports = {
  validationResultUser,
  validationResultLogin,
  validationResultRole
}