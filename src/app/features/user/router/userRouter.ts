import Router from "express";
import UserController from "../controller/UserController.js";
import UserMongooseRepository from "../repository/UserMongooseRepository.js";

const userRouter = Router();
const userRepository = new UserMongooseRepository();
const userController = new UserController(userRepository);

userRouter.post("/register", userController.registerUser);

export default userRouter;
