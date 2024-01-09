import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { type JwtRequest, auth } from "../authMiddleware.js";
import CustomError from "../../CustomError/CustomError.js";

let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
});

afterEach(() => {
  process.env = originalEnv;
});

describe("Given an auth middleware", () => {
  describe("When it receives a request with a encoded Json Web Token", () => {
    const req: Pick<Request, "headers"> = {
      headers: { authorization: "BEARER asdiasudwe72341232" },
    };
    const res = {};
    const next = jest.fn();

    test("Then it should decode the token in the request and call it's next function", () => {
      const expectedDecodedToken = "Test decoded token";
      jest.spyOn(jwt, "verify").mockImplementation(() => expectedDecodedToken);

      auth(req as Request, res as Response, next as NextFunction);

      expect((req as JwtRequest).token).toContain(expectedDecodedToken);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it is initialized without environment variables", () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    test("Then it should call it's next function with error 'Missing JWT_SECRET environment variable'", () => {
      const error = Error("Missing JWT_SECRET environment variable ");
      const expectedCustomError = new CustomError(error, 500, error.message);

      process.env.JWT_SECRET = undefined;

      auth(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });

  describe("When it receives a header without an authorization token", () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    test("Then it should call it's next function with 'Missing authorization token!'", () => {
      const error = new Error("Missing authorization token!");
      const expectedMissingTokenError = new CustomError(
        error,
        401,
        error.message,
      );

      auth(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedMissingTokenError);
    });
  });
});
