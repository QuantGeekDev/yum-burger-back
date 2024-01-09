import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { type JwtRequest, auth } from "../authMiddleware.js";

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
});
