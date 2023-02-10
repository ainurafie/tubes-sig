const ServicePlace = require("../../../models/servicePlace");
const validator = require("validator");
const readAllData = async (req, res, next) => {
  try {
    const data = await ServicePlace.find();
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

const readServicePlaceById = async (req, res, next) => {
  try {
    const id = validator.trim(req.params.id);
    const data = await ServicePlace.findById(id);
    if (data) {
      res.status(200).json({ message: data });
    } else {
    }
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  readAllData,
  readServicePlaceById,
};
