import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../database";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { testUserMock } from "../../../app/features/user/mocks/userMockData";
import { type UserStructure } from "../../../app/features/user/types";

let server: MongoMemoryServer;
beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUrl = server.getUri();
  await connectToDatabase(serverUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
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

      expect(registeredUser.name).toBe(testUserMock.name);
    });
  });
});
