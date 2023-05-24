const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, minLength: 3 },
  timestamp: { type: Date, default: Date.now() },
  content: { type: String, minLength: 3, maxLength: 250 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
