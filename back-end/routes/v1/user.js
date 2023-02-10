const express = require("express");
const router = express.Router();
const authController = require("../../controllers/v1/auth");

const usersServicePlaceController = require("../../controllers/v1/users/user");

router.post("/v1/search", usersServicePlaceController.readAllData);
router.post("/v1/search/:id", usersServicePlaceController.readServicePlaceById);

module.exports = router;
