const validator = require("validator");
const ServicePlace = require("../../../models/servicePlace");

const createServicePlace = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const errors = [];
    const name = validator.trim(req.body.name);

    const rating = validator.trim(req.body.rating);
    const location = validator.trim(req.body.location);
    const open = validator.trim(req.body.open);
    const close = validator.trim(req.body.close);
    const website = validator.trim(req.body.website);
    const headphone = validator.trim(req.body.headphone);
    const longitude = validator.trim(req.body.longitude);
    const latitude = validator.trim(req.body.latitude);

    if (validator.isEmpty(name)) {
      errors.push({
        message: "name is empty",
      });
    }

    if (validator.isEmpty(rating) || !validator.isFloat(rating)) {
      errors.push({
        message: "rating is must float",
      });
    }

    if (validator.isEmpty(location)) {
      errors.push({
        message: "location is empty",
      });
    }

    if (!validator.isEmpty(website) && !validator.isURL(website)) {
      errors.push({
        message: "Url not valid",
      });
    }

    if (!validator.isEmpty(headphone) && !validator.isInt(headphone, { min: 10, max: 13 })) {
      errors.push({
        message: "headphone is not a valid number only leng 10-13",
      });
    }

    if (validator.isEmpty(longitude) || !validator.isFloat(longitude)) {
      errors.push({
        message: "longitude must float",
      });
    }

    if (validator.isEmpty(latitude) || !validator.isFloat(latitude)) {
      errors.push({
        message: "latitude must float",
      });
    }
    console.log(errors);
    if (errors.length > 0) {
      const error = new Error("invalid Input");
      error.data = errors;
      error.httpStatusCode = 422;
      throw error;
    }

    const nameValid = name;
    const ratingValid = parseFloat(rating).toFixed(1);
    const locationValid = location;
    const clockValid = [parseFloat(open).toFixed(2), parseFloat(close).toFixed(2)];
    const websiteValid = website;
    const headphoneValid = headphone;

    const propertiesValid = {
      name: nameValid,
      rating: ratingValid,
      location: locationValid,
      clock: clockValid,
      website: websiteValid,
      headphone: headphoneValid,
    };

    const coordinates = [parseFloat(longitude), parseFloat(latitude)];
    const coordinatesValid = {
      type: "Point",
      coordinates: coordinates,
    };

    const addServicePlace = new ServicePlace({
      type: "Feature",
      properties: propertiesValid,
      geometry: coordinatesValid,
    });
    await addServicePlace.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    return next(err);
  }
};

const readServicePlace = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const data = await ServicePlace.find().limit(10).skip(offset);
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
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const id = validator.trim(req.params.id);
    const data = await ServicePlace.findById(id);
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

const updateServicePlace = async (req, res, next) => {
  try {
    // console.log(req.isAuth);
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const errors = [];
    const id = validator.trim(req.params.id);
    const name = validator.trim(req.body.name);
    const rating = validator.trim(req.body.rating);
    const location = validator.trim(req.body.location);
    const open = validator.trim(req.body.open);
    const close = validator.trim(req.body.close);
    const website = validator.trim(req.body.website);
    const headphone = validator.trim(req.body.headphone);
    const longitude = validator.trim(req.body.longitude);
    const latitude = validator.trim(req.body.latitude);

    if (validator.isEmpty(name)) {
      errors.push({
        message: "name is empty",
      });
    }

    if (validator.isEmpty(rating) || !validator.isFloat(rating)) {
      errors.push({
        message: "rating is must float",
      });
    }

    if (validator.isEmpty(location)) {
      errors.push({
        message: "location is empty",
      });
    }

    if (!validator.isEmpty(website) && !validator.isURL(website)) {
      errors.push({
        message: "Url not valid",
      });
    }

    if (!validator.isEmpty(headphone) && !validator.isInt(headphone, { min: 10, max: 13 })) {
      errors.push({
        message: "headphone is not a valid number only leng 10-13",
      });
    }
    if (validator.isEmpty(longitude) || !validator.isFloat(longitude)) {
      errors.push({
        message: "longitude must float",
      });
    }

    if (validator.isEmpty(latitude) || !validator.isFloat(latitude)) {
      errors.push({
        message: "latitude must float",
      });
    }

    if (errors.length > 0) {
      const error = new Error("invalid Input");
      error.data = errors;
      error.httpStatusCode = 422;
      throw error;
    }

    const nameValid = name;
    const ratingValid = parseFloat(rating).toFixed(1);
    const locationValid = location;
    const clockValid = [parseFloat(open).toFixed(2), parseFloat(close).toFixed(2)];
    const websiteValid = website;
    const headphoneValid = headphone;

    const propertiesValid = {
      name: nameValid,
      rating: ratingValid,
      location: locationValid,
      clock: clockValid,
      website: websiteValid,
      headphone: headphoneValid,
    };

    const coordinates = [parseFloat(longitude), parseFloat(latitude)];
    const coordinatesValid = {
      type: "Point",
      coordinates: coordinates,
    };

    const updateServicePlaceById = {
      type: "Feature",
      properties: propertiesValid,
      geometry: coordinatesValid,
    };
    const data = await ServicePlace.findByIdAndUpdate(id, updateServicePlaceById);
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

const deleteServicePlace = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const error = new Error("User not authorization");
      error.httpStatusCode = 401;
      throw error;
    }
    const id = validator.trim(req.params.id);
    const data = await ServicePlace.findByIdAndDelete(id.toString());
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
  createServicePlace,
  readServicePlace,
  readServicePlaceById,
  updateServicePlace,
  deleteServicePlace,
};
