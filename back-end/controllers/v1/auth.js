const bcryptjs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin");

const loginAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "E-mail is invalid." });
    }
    if (validator.isEmpty(req.body.password)) {
      errors.push({
        message: "Passwords do is empty.",
      });
    }
    if (errors.length > 0) {
      const error = new Error("invalid Input");
      error.data = errors;
      error.httpStatusCode = 422;
      throw error;
    }
    const user = await Admin.findOne({
      email: email,
    });
    if (!user) {
      const error = new Error("User not exists");
      error.httpStatusCode = 401;
      throw error;
    }
    const passwordEquals = await bcryptjs.compare(password, user.password);
    if (!passwordEquals) {
      const error = new Error("password mismatch");
      error.httpStatusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "12d" }
    );
    const response = {
      userId: user._id.toString(),
      email: user.email,
      token: token,
    };

    res
      .status(200)
      .append("Authorization", "Bearer " + token.toString())
      .json({ message: response });
  } catch (err) {
    return next(err);
  }
};

const logoutAdmin = async (req, res, next) => {
  try {
    res.removeHeader("Authorization").status(200);
    res.json({ message: "success" });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const username = req.body.username;

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "E-mail is invalid." });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        returnScore: true,
      })
    ) {
      errors.push({
        message: "Password is too short, must 8 characters with lowercase uppercase and symbols",
      });
    }
    if (!validator.equals(password, confirmPassword)) {
      errors.push({
        message: "Password is not match",
      });
    }
    if (errors.length > 0) {
      const error = new Error("invalid Input");
      error.data = errors;
      error.httpStatusCode = 422;
      throw error;
    }
    const existingUserEmail = await Admin.findOne({
      email: email,
    });
    if (existingUserEmail) {
      const error = new Error("User exists already");
      error.httpStatusCode = 401;
      throw error;
    }
    const existingUserName = await Admin.findOne({
      username: username,
    });
    if (existingUserName) {
      const error = new Error("Username alread exists, please change your username");
      error.httpStatusCode = 401;
      throw error;
    }

    const emailValid = validator.normalizeEmail(validator.trim(email.toLowerCase()));
    const hashedPwValid = await bcryptjs.hash(validator.ltrim(password), 12);
    const usernameValid = validator.ltrim(username);

    const user = new Admin({
      email: emailValid,
      password: hashedPwValid,
      username: usernameValid,
    });
    const data = await user.save();
    if (data) {
      res.status(201).json({ message: "success" });
    } else {
      const error = new Error("id data not found");
      error.httpStatusCode = 404;
      throw error;
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  registerAdmin,
};
