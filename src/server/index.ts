import debugCreator from "debug";
import chalk from "chalk";
import app from "./app";
import cors, { type CorsOptions } from "cors";

const debug = debugCreator("server:");

debug(chalk.blue("Initializing middlewares"));

const corsOptions: CorsOptions = {
  origin: ["https://alex-andru-202309-bcn-front.netlify.app/", "localhost:*"],
};

app.use(cors(corsOptions));
