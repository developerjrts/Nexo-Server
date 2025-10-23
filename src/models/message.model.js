import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    message: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "file", "system"],
      default: "text",
    },
    mediaUrl: String,
    repliedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;
