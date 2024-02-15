const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const productList = require('../controllers/productList')

router.post('/:productId', [auth.authUser], productList.postProductList)
router.get('/', [auth.authUser], productList.getProductList)
router.delete('/:productListId', [auth.authUser], productList.deleteProductList)
router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;