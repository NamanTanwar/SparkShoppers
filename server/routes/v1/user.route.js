const express = require("express");

const { validate } = require("../../middlewares/validate");
const {
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
  addRatingAndReviewSchema,
  getRatingAndReviewsSchema,
  submitContactUsForm,
  sendForgotPasswordEmail,
} = require("../../validations/user.validation");
const { userController } = require("../../controllers/index");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/protected", auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Route hit successfully",
  });
});

router.post(
  "/contact-us-form",
  validate(submitContactUsForm),
  userController.submitContactUsForm
);
//trigger email with secured link for password reset
router.post(
  "/forgot-user-email",
  validate(sendForgotPasswordEmail),
  userController.sendForgotPasswordEmail
);

router.post(
  "/add-rating-and-review",
  auth,
  validate(addRatingAndReviewSchema),
  userController.addRatingAndReview
);

router.post(
  "/get-rating-and-review",
  validate(getRatingAndReviewsSchema),
  userController.getUserReviews
);

router.get("/get-order-history", auth, userController.getOrderHistory);

//Get user by userId
router.get("/:userId", auth, validate(getUserSchema), userController.getUser);

//Update address for user
router.put(
  "/:userId",
  auth,
  validate(updateUserSchema),
  userController.setAddress
);

router.delete(
  "/delete-user/:userId",
  validate(deleteUserSchema),
  userController.deleteUser
);

module.exports = router;
