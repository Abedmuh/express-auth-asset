const productListService = require('../services/productList')

const postProductList = async (req, res, next) => {
  try {
    const { productId } = req.params
    const { id } = req.decoded

    const productList = await productListService.addProductList({ productId, id })

    res.status(201).json({
      message: 'Data produk berhasil ditambahkan',
      productList
    })
  } catch (error) {
    next(error)
  }
}

const getProductList = async (req, res, next) => {
  try {
    const { id } = req.decoded;

    const productLists = await productListService.getOwnerProductList(id)

    res.status(200).json({
      productLists
    });
  } catch (error) {
    next(error)
  }
}

const deleteProductList = async (req, res, next) => {
  try {
    const { productListId } = req.params
    const { id } = req.decoded

    await productListService.verifyProductListAccess(id, productListId)
    await productListService.deleteProductList(productListId)

    res.status(200).json({
      message: "data berhasil dihapus"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProductList,
  getProductList,
  deleteProductList
}