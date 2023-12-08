import { type Request, type Response } from "express";
import { classicBurgerFromDbMock } from "../../mocks/BurgerMocks";
import type BurgerMongooseRepository from "../../repository/BurgerMongooseRepository/BurgerMongooseRepository";
import BurgerController from "../BurgerController";
import CustomError from "../../../../../server/CustomError/CustomError";

describe("Given a burgersController's deleteBurger method ", () => {
  describe("When it receives a request", () => {
    const req: Pick<Request, "params"> = {
      params: { id: "testId" },
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    const burgerRepository: Pick<BurgerMongooseRepository, "deleteBurger"> = {
      deleteBurger: jest.fn().mockReturnValue(classicBurgerFromDbMock),
    };

    const burgerController = new BurgerController(
      burgerRepository as BurgerMongooseRepository,
    );

    test("Then it should call it's status method with code 200", async () => {
      const expectedStatusCode = 200;

      await burgerController.deleteBurger(
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a Classic Burger", async () => {
      await burgerController.deleteBurger(
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({
        burger: classicBurgerFromDbMock,
      });
    });
    describe("When it encounters an error handling the request", () => {
      const req: Pick<Request, "params"> = {
        params: { id: "testId" },
      };
      const res: Pick<Response, "json" | "status"> = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      const customError = new CustomError(
        new Error("Test Error"),
        500,
        "Error deleting burger",
      );
      const burgerRepository: Pick<BurgerMongooseRepository, "deleteBurger"> = {
        deleteBurger: jest.fn().mockRejectedValue(customError),
      };

      const burgerController = new BurgerController(
        burgerRepository as BurgerMongooseRepository,
      );
      test("Then it should call its nextFunction method with a CustomError", async () => {
        const expectedErrorMessage = "Error deleting burger";

        await burgerController.deleteBurger(
          req as Request,
          res as Response,
          next,
        );

        expect(next).toHaveBeenCalledWith(customError);
      });
    });
  });
});
