import { type BurgerRepository } from "../repository/BurgerMongooseRepository/types.js";
import { type Request, type Response } from "express";
class BurgerController {
  constructor(private readonly repository: BurgerRepository) {}
  getBurgers = async (_req: Request, res: Response) => {
    const burgers = await this.repository.getBurgers();
    res.status(200).json({ burgers });
  };
}

export default BurgerController;
