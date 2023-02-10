const errorHandler = (error, req, res, next) => {
  if (error.data) {
    res.status(error.httpStatusCode || 500).json({ message: error  });
    return next();
  } else {
    error.data = [{ message: error.message || "error service" }];
    res.status(error.httpStatusCode || 500).json({ message: error });
    return next();
  }
};
module.exports = {
  errorHandler,
};
