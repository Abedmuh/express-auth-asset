const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const seederController = require('../')

router.post('/', blogController.addBlog);

router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;