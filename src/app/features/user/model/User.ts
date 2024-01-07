import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
