import { type Response, type Request, type NextFunction } from "express";
import User from "../model/User.js";
import { type UserDocument } from "../types.js";
import CustomError from "../../../../server/CustomError/CustomError.js";

class UserController {
  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToBeRegistered = req.body as { body: UserDocument };
      const user = await User.create(userToBeRegistered);
      res.status(201).json({ user });
    } catch (error) {
      const customError = new CustomError(
        error as Error,
        500,
        "Unable to register user",
      );
      next(customError);
    }
  };
}

export default UserController;
