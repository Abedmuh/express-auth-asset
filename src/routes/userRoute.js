const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyuser = require('../middleware/verifyUser')

router.post('/register', [verifyuser.checkDuplicateUsernameOrEmail], userController.registerUser)
router.post('/login', userController.loginUser);
router.get('/login', userController.loginViews);
router.get('/register', userController.registerViews);


router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;