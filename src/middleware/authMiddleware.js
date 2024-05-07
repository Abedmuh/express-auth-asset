const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
  try {
    // const Atoken = req.cookies.jwtAToken;
    // const Rtoken = req.cookies.jwtRtoken;
    const Atoken = req.get('Authorization');
    if (!Atoken) {
      return res.status(403).json({
        message: "unauthorized"
      })
    }


    // jwt.verify(Rtoken, process.env.JWT_SECRET, (err) => {
    //   if (err) {
    //     return res.status(403).send({
    //       message: "Pls relogin",
    //     });
    //   }
    //   req.set('refreshToken', Rtoken)
    // });

    jwt.verify(Atoken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "Unauthorized!",
          error: err.message
        });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
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
    console.log(error.message)
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