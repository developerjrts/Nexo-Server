import express from "express";
import * as authController from "../controllers/auth.controllers.js";
import verifyUser from "../middlewares/auth.middleware.js";
const authRoutes = express.Router();

authRoutes.route("/sign-in").post(authController.signIn);
authRoutes.route("/sign-up").post(authController.signUp);
authRoutes.route("/sign-out").post(authController.signOut);
authRoutes.route("/check-auth").get(verifyUser, authController.checkAuth);

export default authRoutes;
