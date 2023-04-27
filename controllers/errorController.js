const AppError = require("../utils/appError");

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.includes("api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    console.error(err);
    res.status(err.statusCode).render("error", {
      title: "Somethin went wrong!",
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.includes("api")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else if (err.isOperational) {
    res.status(err.statusCode).render("error", {
      title: "Somethin went wrong!",
      msg: err.message,
    });
  } else {
    console.error(err);
    res.status(err.statusCode).render("error", {
      status: "error",
      msg: "Please try again later!",
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicatedFieldDB = (err) => {
  const message = `Duplicated fild value: "${err.keyValue.name}". Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = `Invalid input data. ${err.message}.`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = "Invalid token, please login again";
  return new AppError(message, 401);
};

const handleJWTExpired = () => {
  const message = "Token has expired, please login again";
  return new AppError(message, 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicatedFieldDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpired();
    sendErrorProd(error, req, res);
  }
  // next();
};
