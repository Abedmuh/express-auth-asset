const InvariantError = require('../exceptions/InvariantError')
const AuthorizationError = require('../exceptions/AuthorizationError')
const NotFoundError = require('../exceptions/NotFoundError')
const ProductList = require('../models/productList')

const addProductList = async ({ productId, id }) => {
  const product = new ProductList({
    productId,
    id
  })
  const savedList = await product.save()

  if (!savedList) {
    throw new InvariantError('Product list fail to be saved')
  }

  return savedList
}
// find where owner = id
const getOwnerProductList = async (id) => {
  const list = await ProductList.find()
  return list
}

const getProductListById = async (id) => {
  const list = await ProductList.findById(id)
  if (!list) {
    throw new NotFoundError('Product List not found')
  }
  return list
}

const deleteProductList = async (id) => {
  await ProductList.findByIdAndDelete(id)
}

const verifyProductListAccess = async (user, listId) => {
  try {
    const product = await getProductListById(listId)
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
  getProductListById,
  deleteProductList,
  verifyProductListAccess
}