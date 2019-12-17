const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  avatar: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  DOB: { type: Date },
  bloodType: { type: String, required: true },
  gender: { type: String, required: true },
  personalCard: String,
  personalCardLocation: String,
  address: String,
  phone: String,
  registerDay: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = {
  UserSchema,
  User
};
