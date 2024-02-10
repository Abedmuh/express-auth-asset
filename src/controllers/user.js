const userService = require('../services/user')
const authService = require('../utils/token')

const registerUser = async (req, res) => {
  try {
    const { name, username, email, role, password } = req.body;

    const user = await userService.addUser({ name, username, email, role, password })

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

    const user = await userService.verifyUser({ username, password })

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    // const authData = new Auth({ token: refreshToken });
    // await authData.save();

    // res.cookie('jwtAToken', accessToken, { httpOnly: true, secure: true });
    // res.cookie('jwtRToken', refreshToken, { httpOnly: true, secure: true });

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
    const Rtoken = req.heeaders['refreshToken'];

    await userService.deleteTokenUser(Rtoken)

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', err });
  }
}

const postRole = async (req, res) => {
  try {
    const { name } = req.body

    const roleData = await userService.addRole(name);

    res.status(201).json({
      message: 'Role berhasil ditambahkan',
      roleData
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  }
}

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params

    await userService.deleteRole(id)

    res.status(201).json({
      message: 'Role berhasil dihapus'
    })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  postRole,
  deleteRole
}