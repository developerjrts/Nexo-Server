import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import messageRoutes from "./message.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);

export default router;
