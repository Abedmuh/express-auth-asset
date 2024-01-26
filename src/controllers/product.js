const mongoose = require('mongoose');
const Product = require('../models/product')

const addProduct = async (req, res) => {
  try {
    const { name, price, status, id } = req.body;

    const product = new Product({
      name,
      price,
      status,
      owner: id
    });

    await product.save();

    res.status(201).json({
      message: 'Data product berhasil ditambahkan',
      product
    });
  } catch (error) {
    console.error('Gagal menambahkan data product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getProducts = async (res) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    console.error('Gagal menambahkan data product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    const product = await Product.findById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal mengambil data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const owner = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    if (product.owner != owner) {
      return res.status(403).json({ error: 'Produk ini bukan milikmu' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({ message: 'Produk berhasil dihapus', deletedProduct });
    }
  } catch (error) {
    console.error('Gagal menghapus data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const owner = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    if (product.owner != owner) {
      res.status(403).json({ error: 'Produk ini bukan milikmu' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      res.status(200).json({ message: 'Produk berhasil diupdate', updatedProduct });
    }
  } catch (error) {
    console.error('Gagal mengupdate data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
}