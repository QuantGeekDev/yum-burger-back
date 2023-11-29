import debugCreator from "debug";
import chalk from "chalk";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";
import app from "./app.js";
import {
  generalError,
  notFoundMiddleware,
} from "./middlewares/errorMiddleware.js";
import express from "express";

const debug = debugCreator("server:");

const corsOptions: CorsOptions = {
  origin: ["https://alex-andru-202309-bcn-front.netlify.app/", "localhost:*"],
};

debug(chalk.blue("Initializing middlewares"));

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/", notFoundMiddleware);
app.use(generalError);
