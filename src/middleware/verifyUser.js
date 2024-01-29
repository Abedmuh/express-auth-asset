const User = require('../models/user');
const Roles = require('../models/roles');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {

    const { username, email, role } = req.body;

    const usernameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });
    const userRole = await Roles.findOne({ name: role });

    if (!userRole) {
      return res.status(400).json({
        message: 'Roles not found.'
      });
    }
    if (usernameExist) {
      return res.status(400).json({
        message: "Username is already in use!"
      });
    }
    if (emailExist) {
      return res.status(400).json({
        message: "Email is already in use!"
      });
    }
    req.body.role = userRole
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err.message
    });
  }
};
const verifyUser = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifyUser;