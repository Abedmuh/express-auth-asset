const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(403).json({ message: "unauthorized" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "Unauthorized!",
        });
      }
      req.body.id = decoded.id;
      next();
    });

  } catch (error) {
    console.log("erorr")
    res.status(500).json(error)
  }
}
const authAdmin = async (req, res, next) => {
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
      if (decoded.user.role != 'admin') {
        return res.status(403).json({
          message: "Here lies Admin content"
        })
      }
      req.user = decoded.user;
      next();
    });

  } catch (error) {
    console.log("erorr")
    res.status(500).json(error)
  }
}

const authSuper = async (req, res, next) => {
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
      if (decoded.user.roles != 'Admin' || decoded.user.roles != 'Super') {
        return res.status(403).json({
          message: "Here lies Super content"
        })
      }
      req.user = decoded.user;
      next();
    });

  } catch (error) {
    console.log("erorr")
    res.status(500).json(error)
  }
}


module.exports = {
  authAdmin,
  authUser,
  authSuper
};