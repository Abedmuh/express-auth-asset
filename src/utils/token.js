const AuthModel = require('../models/auth');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({
    id: user._id,
    username: user.username
  },
    process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({
    id: user._id,
    username: user.username
  }, process.env.JWT_SECRET_REFRESH);
  return refreshToken;
};


const verifyRefreshToken = async (refreshToken) => {
  try {
    const authData = await AuthModel.findOne({ token: refreshToken });
    if (!authData) {
      throw new Error('Invalid refreshToken');
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const verifyAccessToken = async (accessToken) => {
  try {
    jwt.verify(accessToken, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken };
