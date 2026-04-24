import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emailText: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    enum: ["formal", "casual", "friendly"],
    default: "formal",
  },
  replyText: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Reply = mongoose.model("Reply", replySchema);

export default Reply;