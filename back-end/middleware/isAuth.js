const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }
    const token = authHeader.split(" ")[1];
    // console.log(token);
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      req.isAuth = false;
      return next();
    }
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
    const user = await Admin.findById(decodedToken.userId);
    if (!user) {
      const error = new Error("User Not Found");
      error.httpStatusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
    req.isAuth = true;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  isAuth,
};
