import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    isVarified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, 
    },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    bio: {
      type: String,
      maxlength: 120,
      default: "",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
    },
    socketId: {
      type: String,
      default: null,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema)

export default userModel