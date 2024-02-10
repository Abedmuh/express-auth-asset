const InvariantError = require('../exceptions/InvariantError')
const AuthorizationError = require('../exceptions/AuthorizationError')
const NotFoundError = require('../exceptions/NotFoundError')
const Product = require('../models/product')

const addProduct = async (name, price, status, image, owner) => {

  const product = new Product({
    name,
    price,
    status,
    image,
    owner
  })

  const savedProduct = await product.save()

  if (!savedProduct) {
    throw new InvariantError('Products fail to be saved')
  }

  return savedProduct
}

const getProductById = async (id) => {

  const product = await Product.findById(id).exec()

  if (!product) {
    throw new NotFoundError('Product not found')
  }
  return product
}

const deleteProduct = async (productId) => {

  const product = await Product.findByIdAndDelete(productId)

  if (!product) {
    throw new InvariantError('Fail to delete the product')
  }
  return product
}

const updateProduct = async (productId, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new InvariantError('Product failed to update')
  }
  return updatedProduct;
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
  getProductById,
  deleteProduct,
  updateProduct,
  verifyProductAccess
}