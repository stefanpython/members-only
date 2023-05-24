const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  membership_status: { type: String },
  message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  isAdmin: { type: Boolean, default: false },
});

// Define a virtual property for the full name
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", UserSchema);
