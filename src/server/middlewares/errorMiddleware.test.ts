import { type Response, type Request, type NextFunction } from "express";
import { generalError } from "./errorMiddleware";
import CustomError from "../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an error middleware", () => {
  describe("When it receives a request with an error 'Test Error' with status code 500", () => {
    const expectedStatusCode = 500;

    const error = new Error("Test Error");

    const customError = new CustomError(
      error,
      expectedStatusCode,
      "Test Error",
    );
    const req = {};
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = {};

    test("Then it should call its status method with code 500", () => {
      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with the error 'Test Error' ", () => {
      const expectedErrorMessage = "Test Error";

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
