const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Auth = require('../models/auth');

router.post('/register', async (req, res, next) => {
  try {
    const { name, username, email, role, password } = req.body;

    const user = new User({
      name,
      username,
      email,
      role,
      password,
    });

    await user.save();
    res.status(201).json({ 
      message: 'User berhasil ditambahkan',
      user
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    // Simpan refreshToken ke database atau cache jika diperlukan

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.use('/users',(req,res) => {
  res.send('Try Another');
})

module.exports = router;