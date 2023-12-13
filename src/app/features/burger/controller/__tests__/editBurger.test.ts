import CustomError from "../../../../../server/CustomError/CustomError";
import { cheeseBurgerFromDbMock } from "../../mocks/BurgerMocks";
import type BurgerMongooseRepository from "../../repository/BurgerMongooseRepository/BurgerMongooseRepository";
import {
  type BurgerFromMongooseStructure,
  type TypedRequestBody,
} from "../../types";
import BurgerController from "../BurgerController";
import { type NextFunction, type Response } from "express";

describe("Given a BurgerController's editBurger method", () => {
  describe("When it receives a response", () => {
    const burgerRepository: Pick<BurgerMongooseRepository, "editBurger"> = {
      editBurger: jest.fn().mockReturnValue(cheeseBurgerFromDbMock),
    };
    const burgerController = new BurgerController(
      burgerRepository as BurgerMongooseRepository,
    );

    const req: TypedRequestBody<BurgerFromMongooseStructure> = {
      body: cheeseBurgerFromDbMock,
    };
    const res: Pick<Response, "json" | "status"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = {};

    test("Then it should call its status method with code 200", async () => {
      const expectedStatusCode = 200;

      await burgerController.editBurger(
        req,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with the modified burger", async () => {
      await burgerController.editBurger(
        req,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ burger: cheeseBurgerFromDbMock });
    });
  });

  describe("When it encounters an error handling a request", () => {
    test("Then it should call its Next function with the error", async () => {
      const expectedCustomError = new CustomError(
        new Error("Test error"),
        400,
        "Error editing burger",
      );
      const burgersRepository: Pick<BurgerMongooseRepository, "editBurger"> = {
        editBurger: jest.fn().mockRejectedValue(expectedCustomError),
      };

      const burgerController = new BurgerController(
        burgersRepository as BurgerMongooseRepository,
      );

      const req: TypedRequestBody<BurgerFromMongooseStructure> = {
        body: cheeseBurgerFromDbMock,
      };
      const res = {};
      const next = jest.fn();
      await burgerController.editBurger(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
