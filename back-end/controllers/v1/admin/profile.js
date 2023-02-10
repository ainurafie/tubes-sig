const validator = require("validator");
const bcryptjs = require("bcryptjs");
const Admin = require("../../../models/admin");

const readProfile = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    console.log(req.userId);
    const data = await Admin.findById(req.userId).select(
      "-_id -password -createdAt -updatedAt -__v"
    );
    if (data) {
      res.status(200).json({ message: data });
    } else {
      const error = new Error("data not found");
      error.httpStatusCode = 401;
      throw error;
    }
  } catch (err) {
    return next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const lastPassword = req.body.lastPassword;
    const newPassword = req.body.newPassword;

    const errors = [];
    if (
      validator.isEmpty(newPassword) ||
      !validator.isStrongPassword(newPassword, {
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
    if (errors.length > 0) {
      const error = new Error("invalid Input");
      error.data = errors;
      error.httpStatusCode = 422;
      throw error;
    }

    const existingUser = await Admin.findById(req.userId);
    if (!existingUser) {
      const error = new Error("User not found");
      error.httpStatusCode = 401;
      throw error;
    }

    const passwordEquals = await bcryptjs.compare(lastPassword, existingUser.password);
    if (!passwordEquals) {
      const error = new Error("password mismatch");
      error.httpStatusCode = 401;
      throw error;
    }

    const hashedPwValid = await bcryptjs.hash(validator.ltrim(newPassword), 12);

    const newProfile = {
      email: existingUser.email,
      password: hashedPwValid,
      username: existingUser.username,
    };

    const data = await Admin.findByIdAndUpdate(req.userId, newProfile);
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

const deleteProfile = async (req, res, next) => {
  try {
    const password = req.body.password;
    const id = validator.trim(req.userId);
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const existingUser = await Admin.findById(id);
    if (!existingUser) {
      const error = new Error("User not found");
      error.httpStatusCode = 401;
      throw error;
    }
    const passwordEquals = await bcryptjs.compare(password, existingUser.password);
    if (!passwordEquals) {
      const error = new Error("password mismatch");
      error.httpStatusCode = 401;
      throw error;
    }

    const data = await Admin.findByIdAndDelete(id);
    if (data) {
      res.removeHeader("Authorization");
      res.status(201).json({ message: "success" });
      res.redirect("/");
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
  readProfile,
  updateProfile,
  deleteProfile,
};
