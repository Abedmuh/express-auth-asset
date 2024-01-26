const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const auth = require('../middleware/authMiddleware')

// mau tambahin yang bisa add/delete product cuma user
router.get('/', productController.getProducts);
router.post('/', [auth.authUser], productController.addProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', [auth.authUser], productController.deleteProduct);
router.put('/:id', [auth.authUser], productController.updateProduct);

router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;