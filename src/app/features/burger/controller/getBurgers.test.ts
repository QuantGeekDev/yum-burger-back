import { burgersMock } from "../../../../mocks/Burger/BurgerMocks";
import CustomError from "../../../../server/CustomError/CustomError";
import { type BurgerRepository } from "../repository/BurgerMongooseRepository/types";
import BurgerController from "./burgersController";
import { type Response, type Request, type NextFunction } from "express";

describe("Given a burgersController's getBurger method", () => {
  describe("When it receives a response", () => {
    const burgersRepository: Pick<BurgerRepository, "getBurgers"> = {
      getBurgers: jest.fn().mockResolvedValue(burgersMock),
    };
    const burgersController = new BurgerController(
      burgersRepository as BurgerRepository,
    );
    const req = {};
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    test("Then it should call its status method with code 200", async () => {
      const expectedStatusCode = 200;

      await burgersController.getBurgers(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with an array containin an array of burgers", async () => {
      await burgersController.getBurgers(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ burgers: burgersMock });
    });
  });
  describe("When it encounters an error", () => {
    const repository: BurgerRepository = {
      getBurgers: jest.fn().mockRejectedValue(new Error("Test Error")),
    };
    const burgerController = new BurgerController(repository);

    const req = {};
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    test("Then it should call its next method with the customError", async () => {
      const error = new Error("Test Error");
      const customError = new CustomError(error, 400, "Test Error");

      await burgerController.getBurgers(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
