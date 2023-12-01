import CustomError from "../../../../../server/CustomError/CustomError.js";
import Burger from "../../model/Burger.js";
import { type BurgerStructure } from "../../types.js";
import {
  type BurgerRepositoryOptions,
  type BurgerRepository,
} from "./types.js";

const defaultOptions: BurgerRepositoryOptions = {
  limit: 10,
};

class BurgerMongooseRepository implements BurgerRepository {
  getBurgers = async (
    options?: BurgerRepositoryOptions,
  ): Promise<BurgerStructure[]> => {
    try {
      if (options) {
        const { limit } = options;
        if (!limit) {
          const { limit } = defaultOptions;
          const burgers = await Burger.find({}).limit(limit!).lean();
          return burgers as BurgerStructure[];
        }

        const burgers = await Burger.find({}).limit(limit).lean();
        return burgers as BurgerStructure[];
      }

      const { limit } = defaultOptions;
      const burgers = await Burger.find({}).limit(limit!).lean();
      return burgers as BurgerStructure[];
    } catch (error) {
      throw new CustomError(error as Error, 400, "Database Error");
    }
  };
}

export default BurgerMongooseRepository;
