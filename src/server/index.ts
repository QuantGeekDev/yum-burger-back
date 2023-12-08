import debugCreator from "debug";
import express from "express";
import helmet from "helmet";
import chalk from "chalk";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";
import app from "./app.js";
import {
  generalError,
  notFoundMiddleware,
} from "./middlewares/errorMiddleware.js";
import pingController from "../app/features/ping/controller/pingController.js";
import { burgerRouter } from "../app/features/burger/router/burgerRouter.js";

const debug = debugCreator("server:");

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  debug(chalk.red("Missing frontend URL"));
}

const corsOptions: CorsOptions = {
  origin: [frontendUrl ?? "", "http://localhost:5173"],
};

debug(chalk.blue("Initializing middlewares"));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", pingController);
app.use("/burgers", burgerRouter);

app.use(notFoundMiddleware);

app.use(generalError);
