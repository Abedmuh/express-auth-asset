const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const blogController = require('../controllers/blog')

router.post('/', [auth.authUser], blogController.addBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', [auth.authUser], blogController.updateBlog);
router.delete('/:id', [auth.authUser], blogController.deleteBlog);

router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;