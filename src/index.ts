import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import "./server/index.js";

const debug = debugCreator("app:");

debug(chalk.blue("Starting App"));
