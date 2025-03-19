import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoomModel",
      // required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    content: { type: String, required: true },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = model("Message", MessageSchema);
export default MessageModel;