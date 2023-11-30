import { type Response, type Request } from "express";
import pingController from "./pingController";

describe("Given a pingController", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    test("Then it should call its status method with code 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with the message '🏓' ", () => {
      const expectedMessage = "🏓";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
