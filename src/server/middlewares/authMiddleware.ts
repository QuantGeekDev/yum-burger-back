import { type Response, type Request, type NextFunction } from "express";
import jwt, { type Secret, type JwtPayload } from "jsonwebtoken";
import CustomError from "../CustomError/CustomError.js";

export interface JwtRequest extends Request {
  token: string | JwtPayload;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.JWT_SECRET) {
      const error = Error("Missing JWT_SECRET environment variable ");
      throw new CustomError(error, 500, error.message);
    }

    const jwtSecret: Secret = process.env.JWT_SECRET;

    if (!req.headers?.authorization) {
      const error = new Error("Missing authorization token!");
      throw new CustomError(error, 401, error.message);
    }

    let jsonWebToken = req.headers.authorization;

    jsonWebToken = jsonWebToken.replace("Bearer", "");

    const decodedToken = jwt.verify(jsonWebToken, jwtSecret);
    (req as JwtRequest).token = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
