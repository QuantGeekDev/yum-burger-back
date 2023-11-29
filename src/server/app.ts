import express from "express";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("app:");

const app = express();
app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    const serverUrl = chalk.yellow(`http://localhost:${port}`);
    debug(chalk.green("Server launched succesfully. Listening on", serverUrl));
  });
};

export default app;
