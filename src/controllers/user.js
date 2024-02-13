const userService = require('../services/user')
const authService = require('../utils/token');
const { validationResultRole, validationResultUser } = require('../validation/user/validate');

const registerUser = async (req, res, next) => {
  try {
    await validationResultUser(req.body)

    const { name, username, email, role, password } = req.body;

    const user = await userService.addUser({ name, username, email, role, password })

    res.status(200).json({
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

    const authData = new Auth({ token: refreshToken });
    await authData.save();

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

const logoutUser = async (req, res, next) => {
  try {
    const Rtoken = req.heeaders['refreshToken'];

    await userService.deleteTokenUser(Rtoken)

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error)
  }
}

const postRole = async (req, res, next) => {
  try {
    await validationResultRole(req.body)

    const { name } = req.body

    const roleData = await userService.addRole(name);

    res.status(201).json({
      message: 'Role berhasil ditambahkan',
      roleData
    })
  } catch (error) {
    next(error)
  }
}

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params

    await userService.deleteRole(id)

    res.status(201).json({
      message: 'Role berhasil dihapus'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  postRole,
  deleteRole
}