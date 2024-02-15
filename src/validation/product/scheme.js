const Joi = require('joi');

const productValidateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.boolean().required(),
  image: Joi.object({
    filename: Joi.string(),
    contentType: Joi.string()
  }), // Jika ID pemilik disimpan sebagai string, bisa juga menggunakan Joi.objectId()
});

module.exports = { productValidateSchema };
