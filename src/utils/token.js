// authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access denied' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

// authService.js
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '60m', // AccessToken berlaku selama 15 menit
  });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_REFRESH);
  // Simpan refreshToken ke database atau cache jika diperlukan
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
