import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../database";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import {
  testUserMock,
  testUserMock2,
  testUserMock3,
} from "../../../app/features/user/mocks/userMockData";
import { type UserStructure } from "../../../app/features/user/types";
import User from "../../../app/features/user/model/User";
import jwt from "jsonwebtoken";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUrl = server.getUri();
  await connectToDatabase(serverUrl);
  await User.create(testUserMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

beforeEach(async () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Given the /POST/ /auth/login endpoint", () => {
  describe("When it receives a request to login a user", () => {
    test("Then it should return status code 200 with a JsonWebToken", async () => {
      const expectedJsonWebToken = "Test Token";
      jest.spyOn(jwt, "sign").mockImplementation(() => expectedJsonWebToken);
      const expectedStatusCode = 200;
      const response = await request(app)
        .get("/auth/login")
        .send(testUserMock)
        .expect(expectedStatusCode);

      const token = (await response.body.token) as UserStructure;

      expect(token).toBe(expectedJsonWebToken);
    });
  });

  describe("When it is asked to login a user that doesn't exist", () => {
    test("Then it should return status code 500 with the error message 'User doesn't exist'", async () => {
      const expectedErrorMessage = "User doesn't exist";
      const expectedStatusCode = 500;

      const response = await request(app)
        .get("/auth/login")
        .send(testUserMock2)
        .expect(expectedStatusCode);

      const actualErrorMessage = (await response.body.error) as UserStructure;

      expect(actualErrorMessage).toBe(expectedErrorMessage);
    });
  });
});
