const InvariantError = require('../exceptions/InvariantError')
const AuthorizationError = require('../exceptions/AuthorizationError')
const NotFoundError = require('../exceptions/NotFoundError')
const ProductList = require('../models/productList')

const addProductList = async ({ productId, id }) => {
  const productList = new ProductList({
    user: id,
    product: productId
  })

  const savedList = await productList.save()

  if (!savedList) {
    throw new InvariantError('Product list fail to be saved')
  }

  return savedList
}

const getOwnerProductList = async (id) => {
  const list = await ProductList.find({ user: id })
  return list
}

const deleteProductList = async (id) => {
  await ProductList.findByIdAndDelete(id)
}

const verifyProductListAccess = async (user, listId) => {
  try {
    const product = await ProductList.findById(listId)
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    if (product.user != user) {
      throw new AuthorizationError('Product is not yours')
    }
  } catch (err) {
    throw new InvariantError(err)
  }
}

module.exports = {
  addProductList,
  getOwnerProductList,
  deleteProductList,
  verifyProductListAccess
}