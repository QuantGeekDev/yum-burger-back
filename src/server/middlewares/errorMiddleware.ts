import { type Response, type Request, type NextFunction } from "express";
import debugCreator from "debug";
import chalk from "chalk";
import CustomError from "../CustomError/CustomError.js";

const debug = debugCreator("server: errorMiddleware:");

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new Error("Endpoint not found");
  const customError = new CustomError(error, 404, "Endpoint not found");
  next(customError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    broadcastMessage = "Internal Server Error",
    message,
    statusCode = 500,
  } = error;
  debug(chalk.red(message));
  res.status(statusCode).json({ error: broadcastMessage });
};
