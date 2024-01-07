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

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUrl = server.getUri();
  await connectToDatabase(serverUrl);
  await User.create(testUserMock3);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

beforeEach(async () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Given the /POST/ /auth/register endpoint", () => {
  describe("When it receives a request to register a user", () => {
    test("Then it should return status code 201 with the registeredUser", async () => {
      const expectedStatusCode = 201;
      const response = await request(app)
        .post("/auth/register")
        .send(testUserMock)
        .expect(expectedStatusCode);

      const registeredUser = (await response.body
        .registeredUser) as UserStructure;

      expect(registeredUser.name).toBe(testUserMock2.name);
    });
  });

  describe("When it is asked to register an existing user", () => {
    test("Then it should return status code 500 with the error message 'Error registering user'", async () => {
      const expectedErrorMessage = "Error registering user";
      jest.spyOn(User, "create").mockRejectedValue(expectedErrorMessage);
      const expectedStatusCode = 500;

      const response = await request(app)
        .post("/auth/register")
        .send(testUserMock2)
        .expect(expectedStatusCode);

      const actualErrorMessage = (await response.body.error) as UserStructure;

      expect(actualErrorMessage).toBe(expectedErrorMessage);
    });
  });

  describe("When it encounters an unexpected error registering user", () => {
    test("Then it should return status code 409 with the error message 'User is already registered'", async () => {
      const expectedErrorMessage = "User already registered";
      const expectedStatusCode = 409;

      const response = await request(app)
        .post("/auth/register")
        .send(testUserMock3)
        .expect(expectedStatusCode);

      const actualErrorMessage = (await response.body.error) as {
        error: string;
      };

      expect(actualErrorMessage).toBe(expectedErrorMessage);
    });
  });
});
