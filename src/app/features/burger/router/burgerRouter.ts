import { Router } from "express";
import BurgerMongooseRepository from "../repository/BurgerMongooseRepository/BurgerMongooseRepository.js";
import BurgerController from "../controller/burgersController.js";

export const burgerRouter = Router();

const burgerRepository = new BurgerMongooseRepository();
const burgerController = new BurgerController(burgerRepository);

burgerRouter.get("/", burgerController.getBurgers);
