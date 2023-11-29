import express from "express";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("app:");

const app = express();

export const startServer = (port: number) => {
  app.listen(port, () => {
    const serverUrl = chalk.yellow(`http://localhost:${port}`);
    debug(chalk.green("Server launched succesfully on", serverUrl));
  });
};

export default app;
