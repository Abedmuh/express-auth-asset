const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) {
      return res.status(403).json({ message: "unauthorized" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });

  } catch (error) {
    console.log("erorr")
    res.status(500).json(error)
  }
}

module.exports = auth;