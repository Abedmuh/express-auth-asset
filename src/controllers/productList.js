const mongoose = require('mongoose');
const ProductList = require('../models/productList')
const productListService = require('../services/productList')

const postProductList = async (req, res, next) => {
  try {
    const { productId, id } = req.body;

    const product = productListService.addProductList({ productId, id })

    res.status(201).json({
      message: 'Data produk berhasil ditambahkan',
      product
    });
  } catch (error) {
    next(error)
  }
}

const getProductList = async (res, next) => {
  try {
    const owners = req.body.id;

    const productLists = await ProductList.find({ user: owners });

    res.status(200).json(productLists);
  } catch (error) {
    next(error)
  }
}

const getProductListById = async (req, res, next) => {
  try {
    const productListId = req.params.product;
    const owner = req.body.id

    if (!mongoose.Types.ObjectId.isValid(productListId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    const productList = await ProductList.findById(productListId);
    if (productList) {
      res.status(200).json(productList);
    }
    if (productList.user != owner) {
      res.status(403).json({ error: 'Produk ini bukan milikmu' });
    }
    if (!productList) {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

  } catch (error) {
    next(error)
  }
}

const deleteProductList = async (req, res, next) => {
  try {
    const productListId = req.params.productListId
    const owner = req.body.id

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ error: 'ID produk tidak valid' });
    // }

    const product = await ProductList.findById(productListId);
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    if (product.user != user) {
      return res.status(403).json({ error: 'Produk ini bukan milikmu' });
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProductList,
  getProductList,
  getProductListById,
  deleteProductList
}