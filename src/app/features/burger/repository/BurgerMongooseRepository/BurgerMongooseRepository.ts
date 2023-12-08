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
      if (!options || !("limit" in options)) {
        const { limit } = defaultOptions;
        const burgers = await Burger.find().limit(limit!).lean();

        return burgers as BurgerStructure[];
      }

      const { limit } = options;
      const burgers = await Burger.find({}).limit(limit!).lean();

      return burgers as BurgerStructure[];
    } catch (error) {
      throw new CustomError(error as Error, 500, "Error getting burgers");
    }
  };

  deleteBurger = async (id: string): Promise<BurgerStructure> => {
    try {
      const burger = await Burger.findByIdAndDelete({ _id: id });
      return burger as BurgerStructure;
    } catch (error) {
      throw new CustomError(error as Error, 500, "Error deleting burger");
    }
  };

  addBurger = async (burger: BurgerStructure): Promise<BurgerStructure> => {
    try {
      const addedBurger = await Burger.create(burger);
      return addedBurger as BurgerStructure;
    } catch (error) {
      throw new CustomError(error as Error, 500, "Error adding burger");
    }
  };
}

export default BurgerMongooseRepository;
