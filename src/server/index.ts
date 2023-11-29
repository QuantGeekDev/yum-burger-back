import debugCreator from "debug";
import chalk from "chalk";
import app from "./app.js";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const debug = debugCreator("server:");

const corsOptions: CorsOptions = {
  origin: ["https://alex-andru-202309-bcn-front.netlify.app/", "localhost:*"],
};

debug(chalk.blue("Initializing middlewares"));

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(errorMiddleware);
