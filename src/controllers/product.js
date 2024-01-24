const mongoose = require('mongoose');
const Product = require('../models/product')

const addProduct = async (req, res) => {
  try {
    const { name, price, status } = req.body;

    const product = new Product({
      name,
      price,
      status,
    });

    await product.save();
    console.log('Data product berhasil disimpan');

    res.status(201).json({ message: 'Data product berhasil ditambahkan' });
  } catch (error) {
    console.error('Gagal menambahkan data product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getProducts = async (req, res) => {
  try {
    const { name, price, status } = req.body;

    const product = new Product({
      name,
      price,
      status,
    });

    await product.save();
    console.log('Data product berhasil disimpan');

    res.status(201).json({ message: 'Data product berhasil ditambahkan' });
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

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.status(200).json({ message: 'Produk berhasil dihapus', deletedProduct });
    } else {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    if (error instanceof ClientError) {
      res.status(error.status).json({
        status: 'fail',
        message: error.message,
      })
    }
    console.error('Gagal menghapus data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      res.status(200).json({ message: 'Produk berhasil diupdate', updatedProduct });
    } else {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
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