import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("session_code", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",  
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};
