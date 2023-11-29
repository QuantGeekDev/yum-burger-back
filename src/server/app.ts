import express from "express";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("app:");

const app = express();

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green("Server launched succesfully"));
  });
};

export default app;
