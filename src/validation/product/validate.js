const InvariantError = require('../../exceptions/InvariantError')
const { productValidateSchema } = require('./scheme')

const validationResultProduct = product => {
  const validationResult = productValidateSchema.validate(product)
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message)
  }
}

module.exports = {
  validationResultProduct
}