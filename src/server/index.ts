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

const debug = debugCreator("server:");

const corsOptions: CorsOptions = {
  origin: ["https://alex-andru-202309-bcn-front.netlify.app/", "localhost:*"],
};

debug(chalk.blue("Initializing middlewares"));

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", pingController);

app.use(notFoundMiddleware);

app.use(generalError);
