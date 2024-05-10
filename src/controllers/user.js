const userService = require('../services/user')
const authService = require('../utils/token')
const { validationResultUser } = require('../validation/user/validate');

const registerUser = async (req, res, next) => {
  try {
    await validationResultUser(req.body)

    const { name, username, email, role, password } = req.body;

    const user = await userService.addUser({ name, username, email, role, password })

    res.status(201).json({
      message: 'User berhasil ditambahkan',
      user
    });

  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.verifyUser({ username, password })

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    // const authData = new Auth({ token: refreshToken });
    // await authData.save();

    // in this case the front end will keep the refresh token
    // res.cookie('jwtAToken', accessToken, { httpOnly: true, secure: true });
    // res.cookie('jwtRToken', refreshToken, { httpOnly: true, secure: true });

    res.status(201).json({
      message: 'berhasil Login',
      user: user.username,
      name: user.name,
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
}