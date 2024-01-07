import { type Response, type Request, type NextFunction } from "express";
import User from "../model/User.js";
import { type UserDocument } from "../types.js";
import CustomError from "../../../../server/CustomError/CustomError.js";

class UserController {
  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToBeRegistered = req.body as UserDocument;

      const { email } = userToBeRegistered;

      const isUserAlreadyRegister = await User.findOne({ email });
      if (isUserAlreadyRegister) {
        const error = Error("User already registered");
        throw new CustomError(error, 409, error.message);
      }

      const user = await User.create(userToBeRegistered);
      res.status(201).json({ user });
    } catch (customError) {
      next(customError);
    }
  };
}

export default UserController;
