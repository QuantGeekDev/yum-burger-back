import { type Response, type Request, type NextFunction } from "express";
import { type UserRepository, type UserStructure } from "../types.js";

class UserController {
  constructor(public userRepository: UserRepository) {}

  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userToBeRegistered = req.body as UserStructure;
      const registeredUser =
        await this.userRepository.registerUser(userToBeRegistered);
      res.status(201).json({ registeredUser });
    } catch (customError) {
      next(customError);
    }
  };
}

export default UserController;
