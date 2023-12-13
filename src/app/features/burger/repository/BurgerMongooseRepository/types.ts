import {
  type BurgerFromMongooseStructure,
  type BurgerStructure,
} from "../../types.js";

export interface BurgerRepository {
  getBurgers: (options?: BurgerRepositoryOptions) => Promise<BurgerStructure[]>;
  deleteBurger: (id: string) => Promise<BurgerStructure>;
  addBurger: (burger: BurgerStructure) => Promise<BurgerStructure>;
  getBurgerById: (id: string) => Promise<BurgerStructure>;
  editBurger: (
    burger: BurgerFromMongooseStructure,
  ) => Promise<BurgerFromMongooseStructure>;
}

export interface BurgerRepositoryOptions {
  limit?: number;
}
