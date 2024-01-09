import { type Response, type Request, type NextFunction } from "express";
import {
  testUserMock,
  registeredTestUserMock,
  testUserWithWrongPasswordMock,
} from "../../mocks/userMockData";
import type UserMongooseRepository from "../../repository/UserMongooseRepository";
import { type UserRepository } from "../../types";
import UserController from "../UserController";
import jwt from "jsonwebtoken";
import CustomError from "../../../../../server/CustomError/CustomError";
import bcrypt from "bcrypt";

let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
});

afterEach(() => {
  process.env = originalEnv;
});

describe("Given a userController's loginUser method", () => {
  const userRepositoryMock: Pick<UserMongooseRepository, "getUserByEmail"> = {
    getUserByEmail: jest.fn().mockResolvedValue(registeredTestUserMock),
  };
  const userController = new UserController(
    userRepositoryMock as UserRepository,
  );
  describe("When it receives a response and a request to login a registered user", () => {
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

  describe("When it receives a response and request to login a user whose password doesn't match", () => {
    const req: Pick<Request, "body"> = {
      body: testUserWithWrongPasswordMock,
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    test("Then it should call it's next method with an error", async () => {
      jest.spyOn(bcrypt, "compare").mockImplementation(() => false);
      const error = Error("Error logging in user");
      const passwordIncorrectError = new CustomError(error, 500, error.message);

      await userController.loginUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(passwordIncorrectError);
    });
  });

  describe("When it is initialized with missing env variable JWT_SECRET", () => {
    const req: Pick<Request, "body"> = {
      body: testUserWithWrongPasswordMock,
    };
    const res: Pick<Response, "json" | "status"> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    test("Then it should call it's next method with error 'Missing JWT_SECRET in environment variables'", async () => {
      process.env.JWT_SECRET = undefined;
      const error = Error("Missing JWT_SECRET");
      const missingJwtSecretError = new CustomError(error, 500, error.message);

      await userController.loginUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(missingJwtSecretError);
    });
  });
});
