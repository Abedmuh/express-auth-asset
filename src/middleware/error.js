const ClientError = require("../exceptions/ClientError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      name: error.name,
      error: error.message
    })
  } else {
    res.status(500).json({
      success: false,
      status: error.statusCode,
      error: error.message
    })
  }
}

module.exports = errorHandler;