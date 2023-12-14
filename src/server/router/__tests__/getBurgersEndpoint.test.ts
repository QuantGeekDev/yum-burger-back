import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../database";
import Burger from "../../../app/features/burger/model/Burger";
import {
  cheeseBurgerFromDbMock,
  classicBurgerFromDbMock,
} from "../../../app/features/burger/mocks/BurgerMocks";
import app from "../../app";
import { type BurgerStructure } from "../../../app/features/burger/types";

let server: MongoMemoryServer;
beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const databaseUrl = server.getUri();
  await connectToDatabase(databaseUrl);
  await Burger.create(classicBurgerFromDbMock);
  await Burger.create(cheeseBurgerFromDbMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server?.stop();
});

describe("Given a GET /burgers route", () => {
  const path = "/burgers";
  describe("When it receives a valid request for burgers", () => {
    test("Then it should return a status code 200 and an array with a classic burger and a cheese burger ", async () => {
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);
      const burgers = (await response.body.burgers) as BurgerStructure[];

      expect(burgers[0]).toHaveProperty("name", cheeseBurgerFromDbMock.name);
      expect(burgers[1]).toHaveProperty("name", classicBurgerFromDbMock.name);
    });
  });

  describe("When it encounters an error getting the burgers", () => {
    test("Then it should respond with code 500 and error message 'Error getting burgers' ", async () => {
      Burger.find = jest.fn().mockReturnValue(new Error("Test Error"));

      const expectedStatusCode = 500;
      const expectedErrorMessage = "Error getting burgers";

      const response = await request(app).get(path).expect(expectedStatusCode);
      const errorMessage = (await response.body) as { error: string };

      expect(errorMessage).toEqual({ error: expectedErrorMessage });
    });
  });
});
