import { Types, type Query } from "mongoose";
import CustomError from "../../../../../server/CustomError/CustomError.js";
import Burger from "../../model/Burger.js";
import {
  type BurgerFromMongooseStructureWithObjectId,
  type BurgerFromMongooseStructure,
  type BurgerStructure,
} from "../../types.js";
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
        const { limit = 10 } = defaultOptions;
        const burgers = await Burger.find().limit(limit).lean();

        return burgers as BurgerStructure[];
      }

      const { limit = 10 } = options;
      const burgers = await Burger.find({}).limit(limit).lean();

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

  getBurgerById = async (id: string) => {
    try {
      const requestedBurger = await Burger.findById(id);
      return requestedBurger as BurgerStructure;
    } catch (error) {
      throw new CustomError(error as Error, 500, "Error getting burger by id");
    }
  };

  editBurger = async (
    burger: BurgerFromMongooseStructure,
  ): Promise<BurgerFromMongooseStructureWithObjectId> => {
    try {
      const editedBurger = await Burger.findByIdAndUpdate(burger._id, burger);
      return editedBurger as BurgerFromMongooseStructureWithObjectId;
    } catch (error) {
      throw new CustomError(error as Error, 500, "Error editing burger");
    }
  };
}

export default BurgerMongooseRepository;
