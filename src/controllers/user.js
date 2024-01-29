const User = require('../models/user')
const bcrypt = require('bcrypt');
const authService = require('../utils/token')

const registerUser = async (req, res) => {
  try {
    const { name, username, email, role, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({
      message: 'User berhasil ditambahkan',
      user
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    // const authData = new Auth({ token: refreshToken });
    // await authData.save();
    res.cookie('jwtAToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('jwtRToken', refreshToken, { httpOnly: true, secure: true });

    res.status(201).json({
      message: 'berhasil Login',
      user: user.username,
      name: user.name,
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(500).json({
      data: err.message
    });
  }
}

const logoutUser = async (req, res) => {
  try {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', err });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', err });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}