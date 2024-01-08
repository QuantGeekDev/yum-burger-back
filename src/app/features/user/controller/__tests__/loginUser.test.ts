import { type Response, type Request, type NextFunction } from "express";
import { testUserMock, registeredTestUserMock } from "../../mocks/userMockData";
import type UserMongooseRepository from "../../repository/UserMongooseRepository";
import { type UserRepository } from "../../types";
import UserController from "../UserController";
import jwt from "jsonwebtoken";

describe("Given a userController's loginUser method", () => {
  describe("When it receives a response and a request to login a registered user", () => {
    const userRepositoryMock: Pick<UserMongooseRepository, "getUserByEmail"> = {
      getUserByEmail: jest.fn().mockResolvedValue(registeredTestUserMock),
    };
    const userController = new UserController(
      userRepositoryMock as UserRepository,
    );
    const req: Pick<Request, "body"> = {
      body: testUserMock,
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    test("Then it should call it's status method with the code 200", async () => {
      const expectedStatusCode = 200;

      await userController.loginUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with a JWT token", async () => {
      const expectedJsonWebToken = "Test token";
      jest.spyOn(jwt, "sign").mockImplementation(() => expectedJsonWebToken);

      await userController.loginUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ token: expectedJsonWebToken });
    });
  });
});
