import { type Jwt } from "jsonwebtoken";
import type mongoose from "mongoose";

export interface UserStructure extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UserRepository {
  registerUser: (userToBeRegistered: UserStructure) => Promise<UserStructure>;
  getUserByEmail: (user: UserStructure) => Promise<UserStructure>;
}
