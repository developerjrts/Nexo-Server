import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import * as messageController from "../controllers/message.controller.js";

const messageRoutes = express.Router();

messageRoutes
  .route("/messages/:receiverId")
  .get(verifyUser, messageController.getMessages);

export default messageRoutes;
