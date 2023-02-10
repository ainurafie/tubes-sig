const express = require("express");
const router = express.Router();
const authController = require("../../controllers/v1/auth");

const AdminServicePlaceController = require("../../controllers/v1/admin/servicePlace");
const AdminProfileController = require("../../controllers/v1/admin/profile");
const { isAuth } = require("../../middleware/isAuth");

router.post("/v1/profile", isAuth, AdminProfileController.readProfile);
router.put("/v1/profile/edit", isAuth, AdminProfileController.updateProfile);
router.post("/v1/profile/delete", isAuth, AdminProfileController.deleteProfile);

router.post("/v1/register", authController.registerAdmin);
router.post("/v1/login", authController.loginAdmin);

router.post("/v1/logout", isAuth, authController.logoutAdmin);

router.post("/v1/service-place", isAuth, AdminServicePlaceController.createServicePlace);
router.post("/v1/service-place/search", isAuth, AdminServicePlaceController.readServicePlace);
router.post(
  "/v1/service-place/search/:id",
  isAuth,
  AdminServicePlaceController.readServicePlaceById
);
router.put("/v1/service-place/:id", isAuth, AdminServicePlaceController.updateServicePlace);
router.delete("/v1/service-place/:id", isAuth, AdminServicePlaceController.deleteServicePlace);
module.exports = router;
