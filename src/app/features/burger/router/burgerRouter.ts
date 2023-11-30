import Router from "express";
import BurgerMongooseRepository from "../repository/BurgerMongooseRepository/BurgerMongooseRepository";
import BurgerController from "../controller/burgersController";

const burgerRepository = new BurgerMongooseRepository();
const burgerController = new BurgerController(burgerRepository);

export const burgerRouter = Router();

burgerRouter.get("/burgers", burgerController.getBurgers);
