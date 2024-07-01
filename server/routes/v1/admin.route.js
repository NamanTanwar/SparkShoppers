const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin.controller");
const { validate } = require("../../middlewares/validate");
const { getOrdersDataSchema } = require("../../validations/admin.validation");
const auth = require("../../middlewares/auth");

router.post(
  "/get-admin-data",
  validate(getOrdersDataSchema),
  auth,
  adminController.getAdminData
);

module.exports = router;
