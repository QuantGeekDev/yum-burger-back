import { type NextFunction, type Request, type Response } from "express";
import type BurgerMongooseRepository from "../../repository/BurgerMongooseRepository/BurgerMongooseRepository";
import BurgerController from "../BurgerController";
import { type BurgerRepository } from "../../repository/BurgerMongooseRepository/types";
import { classicBurgerFromDbMock } from "../../mocks/BurgerMocks";

describe("Given a BurgerController's getBurgerById method", () => {
  describe("When it receives a request to get a classic burger", () => {
    const burgersRepository: Pick<BurgerMongooseRepository, "getBurgerById"> = {
      getBurgerById: jest.fn().mockResolvedValue(classicBurgerFromDbMock),
    };
    const req: Pick<Request, "params"> = {
      params: { id: "6567d60e9fbd027bb1696969" },
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = {};
    const burgersController = new BurgerController(
      burgersRepository as BurgerRepository,
    );

    test("Then it should call its status method with code 200", async () => {
      const expectedStatusCode = 200;
      await burgersController.getBurgerById(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a classic burger", async () => {
      await burgersController.getBurgerById(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({
        burger: classicBurgerFromDbMock,
      });
    });

    describe("When it encounters an error", () => {
      const burgersRepository: Pick<BurgerMongooseRepository, "getBurgerById"> =
        {
          getBurgerById: jest.fn().mockRejectedValue("Test Error"),
        };
      const burgersController = new BurgerController(
        burgersRepository as BurgerRepository,
      );

      const req: Pick<Request, "params"> = {
        params: { id: "6567d60e9fbd027bb1696969" },
      };
      const res = {};
      const next = jest.fn();

      test("Then it should call its nextMethod with the error", async () => {
        const expectedStatusCode = 500;
        await burgersController.getBurgerById(
          req as Request,
          res as Response,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(expectedStatusCode);
      });
    });
  });
});
