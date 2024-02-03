const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyuser = require('../middleware/verifyUser')

router.post('/register', [verifyuser.checkDuplicateUsernameOrEmail], userController.registerUser)
router.post('/login', userController.loginUser);


router.post('/role', userController.addRole)


router.use('/', (res) => {
  res.send('Try Another');
})

module.exports = router;