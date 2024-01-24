const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;