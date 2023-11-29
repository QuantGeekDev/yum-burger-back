import { type Response, type NextFunction, type Request } from "express";
import CustomError from "../../CustomError/CustomError";
import { notFoundMiddleware } from "../errorMiddleware";

describe("Given a notFound middleware", () => {
  describe("When it receives a request for path 'i-dont-exist'", () => {
    test("Then it should call its next function with a customError whose message is 'Endpoint not found' and status code is 404", () => {
      const req = {};
      const res = {};
      const next = jest.fn().mockReturnThis();
      const expectedError = new Error("Endpoint not found");
      const expectedCustomError = new CustomError(
        expectedError,
        404,
        "Endpoint not found",
      );

      notFoundMiddleware(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
