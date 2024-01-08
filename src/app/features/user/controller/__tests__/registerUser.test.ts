import { type Request, type Response } from "express";
import { type NextFunction } from "express-serve-static-core";
import { type UserRepository } from "../../types";
import UserController from "../UserController";
import { testUserMock2 } from "../../mocks/userMockData";

describe("Given a UserController's registerUser method", () => {
  describe("When it receives a response and a request to register new user 'testuser@gmail.com'", () => {
    const userRepository: Pick<UserRepository, "registerUser"> = {
      registerUser: jest.fn().mockResolvedValue(testUserMock2),
    };

    const userController = new UserController(userRepository as UserRepository);

    const req: Pick<Request, "body"> = {
      body: testUserMock2,
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    test("Then it should return statusCode 201", async () => {
      const expectedStatusCode = 201;

      await userController.registerUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should return a UserModel object with email 'testuser@gmail.com'", async () => {
      await userController.registerUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ registeredUser: testUserMock2 });
    });
  });
});
