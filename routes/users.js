const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controller/users");
const {
  verifyUser,
  login,
  logout,
  giveAllUser,
  followUnfollowUser,
  viewProfile,
  updateProfile,
  deleteUser,
  viewOtherProfile,
} = require("../controller/users");
const userRouter = express.Router();

userRouter.route("/users/createprofile").post(createUser);
userRouter.route("/users/login").post(login);
userRouter.route("/users/logout").get(isAuthenticated, logout);
userRouter.route("/confirm/signUp/:token").get(verifyUser);
userRouter.route("/follow/:id").get(isAuthenticated, followUnfollowUser);
userRouter.route("/profile/me").get(isAuthenticated, viewProfile);
userRouter.route("/profile/update").put(isAuthenticated, updateProfile);
userRouter
  .route("/profile/updatePassword")
  .put(isAuthenticated, updatePassword);
userRouter.route("/profile/deleteUser").delete(isAuthenticated, deleteUser);
userRouter.route("/forget/password").post(forgotPasswordToken);
userRouter.route("/password/reset/:id").post(resetPassword);
userRouter.route("/user/all").get(isAuthenticated, giveAllUser);
userRouter.route("/user/:id").get(isAuthenticated, viewOtherProfile);
module.exports = userRouter;
