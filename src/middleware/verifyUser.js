const User = require('../models/user');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {

    const { username, email } = req.body;

    const usernameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });

    if (usernameExist) {
      return res.status(400).json({ message: "Failed! Username is already in use!" });
    }

    if (emailExist) {
      return res.status(400).json({ message: "Failed! Email is already in use!" });
    }

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