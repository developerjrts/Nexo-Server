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
  }
};
