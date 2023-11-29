import { type Response, type Request } from "express";
import type CustomError from "../CustomError/CustomError";
import debugCreator from "debug";
const debug = debugCreator("server:errorMiddleware:");

export const errorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
) => {
  const { broadcastMessage, message, statusCode } = error;

  debug(message);
  res.status(statusCode).json({ error: broadcastMessage });
};
