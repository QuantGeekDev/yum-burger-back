import mongoose, { Schema } from "mongoose";
import { type UserStructure } from "../types";
import bcrypt from "bcrypt";

const UserSchema: mongoose.Schema<UserStructure> = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  const saltRounds = 8;

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = mongoose.model("User", UserSchema, "users");

export default User;
