import Router from "express";
import UserController from "../controller/UserController.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", userController.registerUser);

export default userRouter;
