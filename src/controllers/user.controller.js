import userModel from "../models/user.model.js";

export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: error.message,
      status: false,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await userModel.find({ _id: { $ne: userId } });

    res.status(200).json({
      status: true,
      message: "users sent",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: error.message,
      status: false,
    });
  }
};
