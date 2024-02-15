const Joi = require('joi');
// joi role harusny mongodb object
const userValidateSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.required(),
  password: Joi.string().min(3).max(255).required(),
});

const loginValidateSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(3).max(255).required(),
});

const roleValidateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  userValidateSchema,
  loginValidateSchema,
  roleValidateSchema,
};
