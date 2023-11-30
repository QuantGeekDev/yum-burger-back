import { type BurgerStructure } from "../../types.js";

export interface BurgerRepository {
  getBurgers: (options?: BurgerRepositoryOptions) => Promise<BurgerStructure[]>;
}

export interface BurgerRepositoryOptions {
  limit?: number;
}
