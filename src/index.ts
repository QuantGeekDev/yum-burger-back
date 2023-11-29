import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import "./server/index.js";
import { startServer } from "./server/app.js";

const debug = debugCreator("app:");

debug(chalk.blue("Starting App"));

const defaultPort = 1337;
const port = process.env.PORT ?? defaultPort;

if (!port) {
  debug(chalk.red(`Port not set, shutting down`));
  process.exit();
}

startServer(+port);
