import mongoose, { Schema } from "mongoose";
import { type UserStructure } from "../types";

const userSchema = new Schema<UserStructure>({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
