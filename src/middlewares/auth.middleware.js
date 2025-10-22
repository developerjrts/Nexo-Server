import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Invalid token!",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default verifyUser;
