const productService = require('../services/product')
const Product = require('../models/product')

const addProduct = async (req, res, next) => {
  try {
    const { name, price, status } = req.body;
    const owner = req.decoded.id
    const image = req.file ? {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    } : null;

    const product = await productService.addProduct(name, price, status, image, owner)

    res.status(201).json({
      message: 'Data product berhasil ditambahkan',
      product
    });
  } catch (error) {
    next(error)
  }
}

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      data: products
    })

  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ error: 'ID produk tidak valid' });
    // }

    const product = await productService.getProductById(productId)

    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const owner = req.decoded.id;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ error: 'ID produk tidak valid' });
    // }
    await productService.verifyProductAccess(owner, productId)
    await productService.deleteProduct(productId)

    res.status(200).json({ message: 'Produk berhasil dihapus' });

  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const owner = req.decoded.id;
    const body = req.body;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ error: 'ID produk tidak valid' });
    // }

    await productService.verifyProductAccess(owner, productId)

    const updatedProduct = await productService.updateProduct(productId, body)
    res.status(200).json({
      message: 'Produk berhasil diupdate',
      updatedProduct
    });
  } catch (error) {
    next(error)
  }
}
module.exports = {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
}