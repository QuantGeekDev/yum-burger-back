import { type Response } from "express";
import {
  veganBurgerFromDbMock,
  veganBurgerMock,
} from "../../mocks/BurgerMocks";
import type BurgerMongooseRepository from "../../repository/BurgerMongooseRepository/BurgerMongooseRepository";
import { type BurgerRepository } from "../../repository/BurgerMongooseRepository/types";
import { type BurgerStructure, type TypedRequestBody } from "../../types";
import BurgerController from "../BurgerController";
import CustomError from "../../../../../server/CustomError/CustomError";

describe("Given a BurgerController's addBurger method", () => {
  describe("When it receives a request to add a vegan burger", () => {
    const req: TypedRequestBody<BurgerStructure> = {
      body: veganBurgerMock,
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    const burgerRepository: Pick<BurgerRepository, "addBurger"> = {
      addBurger: jest.fn().mockReturnValue(veganBurgerFromDbMock),
    };

    const burgerController = new BurgerController(
      burgerRepository as BurgerMongooseRepository,
    );

    test("Then it returns status code 200", async () => {
      const expectedStatusCode = 200;

      await burgerController.addBurger(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it returns a vegan burger", async () => {
      await burgerController.addBurger(req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ burger: veganBurgerFromDbMock });
    });
  });

  describe("When it encounters an error adding the vegan burger", () => {
    const customError = new CustomError(
      new Error("Test Error"),
      500,
      "Test Error",
    );
    const burgerRepository: Pick<BurgerRepository, "addBurger"> = {
      addBurger: jest.fn().mockRejectedValue(customError),
    };
    const burgerController = new BurgerController(
      burgerRepository as BurgerMongooseRepository,
    );

    test("Then it should call its nextFunction method with an error", async () => {
      const req: TypedRequestBody<BurgerStructure> = {
        body: veganBurgerMock,
      };
      const res: Pick<Response, "json" | "status"> = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn().mockReturnThis();

      await burgerController.addBurger(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
