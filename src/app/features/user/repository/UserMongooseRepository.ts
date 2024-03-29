import CustomError from "../../../../server/CustomError/CustomError.js";
import User from "../model/User.js";
import { type UserStructure, type UserRepository } from "../types";

class UserMongooseRepository implements UserRepository {
  registerUser = async (
    userToBeRegistered: UserStructure,
  ): Promise<UserStructure> => {
    const { email } = userToBeRegistered;
    try {
      const isUserAlreadyRegister = await User.findOne({ email });
      if (isUserAlreadyRegister) {
        const error = Error("User already registered");
        throw new CustomError(error, 409, error.message);
      }

      const user = await User.create(userToBeRegistered);

      return user as UserStructure;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError(error as Error, 500, "Error registering user");
    }
  };

  getUserByEmail = async (user: UserStructure): Promise<UserStructure> => {
    const { email } = user;

    try {
      const databaseUser = await User.findOne({ email });
      if (!databaseUser) {
        const error = Error("User doesn't exist");
        throw new CustomError(error, 500, error.message);
      }

      return databaseUser;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError(
        error as Error,
        500,
        "Error retrieving user from database",
      );
    }
  };
}

export default UserMongooseRepository;
