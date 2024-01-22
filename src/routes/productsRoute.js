const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const ClientError = require('../exception/ClientError')

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error('Gagal mengambil data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/products', async (req, res) => {
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
});

router.get('/products/:id', async (req, res) => {
  try {
    // Mengambil ID produk dari parameter URL
    const productId = req.params.id;
    
    // Mencari satu produk berdasarkan ID
    const product = await Product.findById(productId);

    // Jika produk ditemukan, kirim respons ke klien
    if (product) {
      res.status(200).json(product);
    } else {
      // Jika produk tidak ditemukan, kirim respons 404 (Not Found)
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal mengambil data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rute DELETE untuk menghapus satu produk berdasarkan ID
router.delete('/products/:id', async (req, res) => {
  try {
    // Mengambil ID produk dari parameter URL
    const productId = req.params.id;

    // Memeriksa apakah ID memiliki format yang benar sebelum mencoba menghapus produk
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    // Mencari dan menghapus satu produk berdasarkan ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Jika produk ditemukan dan dihapus, kirim respons ke klien
    if (deletedProduct) {
      res.status(200).json({ message: 'Produk berhasil dihapus', deletedProduct });
    } else {
      // Jika produk tidak ditemukan, kirim respons 404 (Not Found)
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
});

// Rute PUT untuk mengupdate satu produk berdasarkan ID
router.put('/products/:id', async (req, res) => {
  try {
    // Mengambil ID produk dari parameter URL
    const productId = req.params.id;

    // Memeriksa apakah ID memiliki format yang benar sebelum mencoba mengupdate produk
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }

    // Mencari dan mengupdate satu produk berdasarkan ID
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body, // Menggunakan data yang dikirim dalam body permintaan sebagai data update
      { new: true, runValidators: true }
    );

    // Jika produk ditemukan dan berhasil diupdate, kirim respons ke klien
    if (updatedProduct) {
      res.status(200).json({ message: 'Produk berhasil diupdate', updatedProduct });
    } else {
      // Jika produk tidak ditemukan, kirim respons 404 (Not Found)
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    console.error('Gagal mengupdate data produk:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.use('/product', (req, res) => {
  res.send('Try Another');
})

module.exports = router;