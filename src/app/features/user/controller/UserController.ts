import { type Response, type Request, type NextFunction } from "express";
import { type UserRepository, type UserStructure } from "../types.js";
import bcrypt from "bcrypt";
import CustomError from "../../../../server/CustomError/CustomError.js";
import jwt, { type Secret } from "jsonwebtoken";

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

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!process.env.JWT_SECRET) {
        const error = Error("Missing JWT_SECRET");
        throw new CustomError(error, 500, error.message);
      }

      const secretKey: Secret = process.env.JWT_SECRET;

      const userToBeLoggedIn = req.body as UserStructure;
      const databaseUser: UserStructure =
        await this.userRepository.getUserByEmail(userToBeLoggedIn);
      const match = await bcrypt.compare(
        userToBeLoggedIn.password,
        databaseUser.password,
      );

      if (!match) {
        const error = Error("Error logging in user");
        throw new CustomError(error, 500, error.message);
      }

      const token = jwt.sign(
        {
          _id: databaseUser._id as string,
          email: databaseUser.email,
        },
        secretKey,
        { expiresIn: "3 days" },
      );

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
