import { generateToken } from "../lib/utils.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { username, email, name, password } = req.body;

    const checkUsername = await userModel.findOne({ username });
    if (checkUsername) {
      return res.status(409).json({
        status: false,
        message: "Username already exists!",
      });
    }

    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({
        status: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      isVarified: true
    });

    const { password: _, ...userData } = user._doc;

    const token = await generateToken(user._id, res)

    res.status(201).json({
      status: true,
      message: "User created successfully!",
      user: userData,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid username!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials!",
      });
    }

    const { password: _, ...userData } = user._doc;
   const token = await generateToken(user._id, res)
    res.status(200).json({
      status: true,
      message: "Signed in successfully!",
      user: userData,
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


export const signOut = async(req, res) => {
    try {
        res.cookie("session_code", "", {maxAge: 0});
        res.status(200).json({
          status: true,
          message: "Signed out"
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            status: false
        })
    }
}