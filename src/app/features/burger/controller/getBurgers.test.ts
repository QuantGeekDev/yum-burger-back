import {
  burgersMock,
  cheeseBurgerMock,
} from "../../../../mocks/Burger/BurgerMocks";
import BurgerMongooseRepository from "../repository/BurgerMongooseRepository/BurgerMongooseRepository";
import { type BurgerRepository } from "../repository/BurgerMongooseRepository/types";
import BurgerController from "./burgersController";
import { type Response, type Request } from "express";

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

    test("Then it should call its status method with code 200", async () => {
      const expectedStatusCode = 200;

      await burgersController.getBurgers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with an array containin an array of burgers", async () => {
      await burgersController.getBurgers(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ burgers: burgersMock });
    });
  });
});
