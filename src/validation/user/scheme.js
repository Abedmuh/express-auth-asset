const Joi = require('joi');

const userValidateSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string(), // Ini dapat disesuaikan tergantung pada bagaimana ID peran disimpan
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
