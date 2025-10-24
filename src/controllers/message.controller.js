import messageModel from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const userId = req.user._id;
    const messages = await messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      })
      .populate("senderId", "name username avatar")
      .populate("receiverId", "name username avatar");

    res.status(200).json({
      status: true,
      message: "messages sent",
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: error.message,
      status: false,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const message = req.body.message;
    const senderId = req.user._id;

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json({
      status: true,
      message: "message sent",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: error.message,
      status: false,
    });
  }
};
