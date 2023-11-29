import debugCreator from "debug";
import chalk from "chalk";
import app from "./app.js";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";

const debug = debugCreator("server:");

const corsOptions: CorsOptions = {
  origin: ["https://alex-andru-202309-bcn-front.netlify.app/", "localhost:*"],
};

debug(chalk.blue("Initializing middlewares"));

app.use(morgan("dev"));

app.use(cors(corsOptions));
