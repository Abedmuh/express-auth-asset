const User = require('../models/user');
const Roles = require('../models/roles');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {

    const { username, email, role } = req.body;

    const usernameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });
    const userRole = await Roles.findOne({ name: role });

    if (!userRole) {
      return res.status(400).json({ error: 'Roles not found.' });
    }
    if (usernameExist) {
      return res.status(400).json({ message: "Failed! Username is already in use!" });
    }
    if (emailExist) {
      return res.status(400).json({ message: "Failed! Email is already in use!" });
    }
    req.body.role = userRole
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const verifyUser = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifyUser;