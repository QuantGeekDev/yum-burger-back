import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../database";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { veganBurgerMock } from "../../../app/features/burger/mocks/BurgerMocks";
import {
  type BurgerStructure,
  type TypedRequestBody,
} from "../../../app/features/burger/types";
import Burger from "../../../app/features/burger/model/Burger";

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

describe("Given a POST /burgers endpoint", () => {
  describe("When it receives a request to add a vegan burger", () => {
    test("Then it should return status code 200 and a vegan burger", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .post("/burgers")
        .send(veganBurgerMock)
        .expect(expectedStatusCode);

      const burger = response.body.burger as BurgerStructure;

      expect(burger.name).toBe(veganBurgerMock.name);
    });
  });

  describe("When it encounters an error handling a request", () => {
    test("Then it should return code 500 and error message 'Error adding burger' ", async () => {
      jest.spyOn(Burger, "create").mockRejectedValue("Error");

      const expectedStatusCode = 500;
      const expectedErrorMessage = "Error adding burger";

      const response = await request(app)
        .post("/burgers")
        .send(veganBurgerMock)
        .expect(expectedStatusCode);

      const errorMessage = (await response.body.error) as { error: string };

      expect(errorMessage).toBe(expectedErrorMessage);
    });
  });
});
