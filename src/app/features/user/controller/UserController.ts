import { type Response, type Request, type NextFunction } from "express";
import User from "../model/User";
import { type UserDocument } from "../types";

class UserController {
  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToBeRegistered = req.body as { body: UserDocument };
      const user = await User.create(userToBeRegistered);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
