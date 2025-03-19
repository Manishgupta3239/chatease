import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChatRoomSchema = new Schema(
  {
    roomName: { type: String, default: "Direct Message" }, 
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    isGroupChat: { type: Boolean, default: false },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "MessageModel" }, // Optional
  },
  { timestamps: true }
);

const ChatRoomModel = model("ChatRoom", ChatRoomSchema);

export default ChatRoomModel;
