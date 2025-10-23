import express from "express";
import * as userController from "../controllers/user.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";
const userRoutes = express.Router();

userRoutes
  .route("/:username")
  .get(verifyUser, userController.getUserByUsername);

userRoutes.route("/get/all-users").get(verifyUser, userController.getAllUsers);

export default userRoutes;
