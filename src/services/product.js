const InvariantError = require('../exceptions/InvariantError')
const AuthorizationError = require('../exceptions/AuthorizationError')
const NotFoundError = require('../exceptions/NotFoundError')

const addProduct = async (name, price, status) => {

  const product = new Product(
    name,
    price,
    status,
    image,
    owner
  )

  const savedProduct = product.save()

  if (!savedProduct) {
    throw new InvariantError('Products fail to be saved')
  }

  return savedProduct
}

const getProduct = async () => {
  return Product.find()
}

const getProductById = async (id) => {

  const product = Product.findById(id)

  if (!product) {
    throw new NotFoundError('Product not found')
  }
  return product
}

const deleteProduct = async (id) => {

  const product = Product.findByIdAndDelete(id)

  if (!product) {
    throw new NotFoundError('Product not found')
  }
  return product
}

const verifyProductAccess = async (owner, productId) => {
  try {
    const product = await getProductById(productId)
    if (!product) {
      throw new InvariantError('Product not found')
    }
    if (product.owner != owner) {
      throw new AuthorizationError('Product is not yours')
    }
  } catch (err) {
    throw new InvariantError(err)
  }
}



module.exports = {
  addProduct,
  getProduct,
  getProductById,
  deleteProduct,
  verifyProductAccess
}