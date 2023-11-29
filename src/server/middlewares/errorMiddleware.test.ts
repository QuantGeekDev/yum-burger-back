import { type Response, type Request } from "express";
import { errorMiddleware } from "./errorMiddleware";
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

    test("Then it should call its status method with code 500", () => {
      errorMiddleware(customError, req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with the error 'Test Error' ", () => {
      const expectedErrorMessage = "Test Error";

      errorMiddleware(customError, req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
