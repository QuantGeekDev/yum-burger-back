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
    options: BurgerRepositoryOptions,
  ): Promise<BurgerStructure> => {
    if (options.limit) {
      const { limit } = options;
      const burgers = await Burger.find().limit(limit).lean();
      return burgers[0];
    }

    const { limit } = defaultOptions;
    const burgers = await Burger.find().limit(limit!).lean();
    return burgers[0];
  };
}

export default BurgerMongooseRepository;
