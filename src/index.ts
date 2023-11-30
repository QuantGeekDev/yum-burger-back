import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import "./server/index.js";
import { startServer } from "./server/app.js";
import { connectToDatabase } from "./database/index.js";

const debug = debugCreator("root: index");

debug(chalk.blue("Starting App"));

const defaultPort = 1337;
const port = process.env.PORT ?? defaultPort;

if (!port) {
  debug(chalk.red(`Port not set, shutting down...`));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  debug(chalk.red("Database URL not defined, shutting down..."));
  process.exit();
}

await connectToDatabase(mongoUrl);

startServer(+port);
