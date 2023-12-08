import { type BurgerStructure } from "../../types.js";

export interface BurgerRepository {
  getBurgers: (options?: BurgerRepositoryOptions) => Promise<BurgerStructure[]>;
  deleteBurger: (id: string) => Promise<BurgerStructure>;
}

export interface BurgerRepositoryOptions {
  limit?: number;
}
