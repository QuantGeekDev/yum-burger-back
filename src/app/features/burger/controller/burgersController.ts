import CustomError from "../../../../server/CustomError/CustomError.js";
import { type BurgerRepository } from "../repository/BurgerMongooseRepository/types.js";
import { type NextFunction, type Request, type Response } from "express";

class BurgerController {
  constructor(private readonly repository: BurgerRepository) {}
  getBurgers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const burgers = await this.repository.getBurgers();

      res.status(200).json({ burgers });
    } catch (customError) {
      next(customError);
    }
  };
}

export default BurgerController;
